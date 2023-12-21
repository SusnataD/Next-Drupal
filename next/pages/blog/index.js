import React, { useEffect } from "react";
import { useCommonContext } from "../../context/CommonContext";
import { GetGlobalElements } from "../../shared/getGlobalElements";
import { drupal } from "../../lib/drupal";
import Layout from "../../components/layout";
import NodeArticleTeaser from "../../components/node--article--teaser";
import InnerHeroSection from "@/components/innerHeroSection";

const Blog = ({ node, nodes, globalElements }) => {
  // Use the data obtained from getStaticProps to update the common state
  const { updateCommonState } = useCommonContext();
  useEffect(() => {
    updateCommonState(globalElements);
  }, [globalElements]);

  return (
    <Layout
      title={node.title}
      description={node.field_meta_description}
      keyword={node.field_meta_keyword}
      ogImage={node.field_og_image.field_media_image}
    >
      {console.log("node > ", node)}
      <InnerHeroSection
        title={node.title}
        desktop_banner_img={node.field_desktop_banner_image.field_media_image}
      />
      <section className="blog-listing pt-4">
        <div className="container">
          <h1 className="text-center p-3">Blog Listing</h1>
          <div className="row">
            {nodes?.length ? (
              nodes.map((node) => (
                <div className="col-md-4" key={node.id}>
                  <NodeArticleTeaser node={node} />
                </div>
              ))
            ) : (
              <p className="py-4">No nodes found</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps(context) {
  try {
    const globalElements = await GetGlobalElements(drupal);

    // Fetch basic page from Drupal
    const node = await drupal.getResource(
      "node--page",
      "defe4d4c-673f-4fc6-8714-ffe52a1dd6e3",
      {
        params: {
          "filter[status]": 1,
          "fields[node--page]":
            "title,path,body,field_meta_keyword,field_meta_description,field_desktop_banner_image,field_mobile_banner_image,field_og_image,uid,created",
          include:
            "uid,field_desktop_banner_image.field_media_image,field_mobile_banner_image.field_media_image,field_og_image.field_media_image",
        },
      }
    );

    // Fetch data from Drupal for nodes
    const nodes = await drupal.getResourceCollectionFromContext(
      "node--blog",
      context,
      {
        params: {
          "filter[status]": 1,
          "fields[node--blog]":
            "title,path,field_order,field_image_media,uid,created",
          include: "uid,field_image_media,field_image_media.field_media_image",
          sort: "-field_order",
        },
      }
    );

    return {
      props: { node, nodes, globalElements },
    };
  } catch (error) {
    // Handle the error here, you can log it or dispatch another action
    console.error("Error in getStaticProps:", error);
    // You might want to return an error payload or redirect to an error page
    return {
      props: { error: "An error occurred while fetching data." },
    };
  }
}

export default Blog;
