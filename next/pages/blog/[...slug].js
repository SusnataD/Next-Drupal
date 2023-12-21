import React, { useEffect } from "react";
import { useCommonContext } from "../../context/CommonContext";
import { GetGlobalElements } from "../../shared/getGlobalElements";
import { drupal } from "../../lib/drupal";
import NodeBasicPage from "../../components/node--basic-page";
import NodeArticleTeaser from "../../components/node--article--teaser";
import Layout from "../../components/layout";
import { useRouter } from "next/router";

export default function NodePage({ resource, nodes, globalElements }) {
  if (!resource) return null;
  const router = useRouter();

  // Use the data obtained from getStaticProps to update the common state
  const { updateCommonState } = useCommonContext();
  useEffect(() => {
    updateCommonState(globalElements);
  }, [globalElements]);

  const undesiredId = resource.id;
  const otherBlogs = nodes.filter((item) => item.id !== undesiredId);

  return (
    <Layout
      title={resource.title}
      description={resource.title + " description"}
    >
      {resource.type === "node--blog" && <NodeBasicPage node={resource} />}
      {otherBlogs?.length > 0 && (
        <section className="blog-listing pt-4 pb-5">
          <div className="container">
            <h1 className="text-center p-3">Related Blog Listing</h1>
            <div className="row">
              {otherBlogs?.length ? (
                otherBlogs.map((node) => (
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
      )}
    </Layout>
  );
}

export async function getStaticPaths(context) {
  return {
    paths: await drupal.getStaticPathsFromContext(["node--blog"], context),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  try {
    const globalElements = await GetGlobalElements(drupal);

    // Fetch all blog from Drupal
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

    // For dynamic node by path from Drupal
    const path = await drupal.translatePathFromContext(context, {
      pathPrefix: "blog", // replace 'yourPathPrefix' with the actual path prefix you want
    });

    if (!path) {
      return {
        notFound: true,
      };
    }

    const type = path.jsonapi.resourceName;

    let params = {};
    if (type === "node--blog") {
      params = {
        include: "uid,field_image_media,field_image_media.field_media_image",
      };
    }

    const resource = await drupal.getResourceFromContext(path, context, {
      params,
    });

    if (!resource) {
      throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
    }

    if (!context.preview && resource?.status === false) {
      return {
        notFound: true,
      };
    }

    return {
      props: { resource, nodes, globalElements },
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
