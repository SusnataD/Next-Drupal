import React from "react";
import { wrapper } from "../../store/reducers/store";
import { getGlobalElements } from "../../store/actions/commonAction";
import { drupal } from "../../lib/drupal";
import Layout from "../../components/layout";
import NodeArticleTeaser from "../../components/node--article--teaser";

const Blog = ({ nodes }) => {
  return (
    <Layout title="Blog Listing" description="Blog Listing">
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

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    await store.dispatch(getGlobalElements());

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

    let complete = "ok";
    return {
      props: { complete, nodes },
      revalidate: 60,
    };
  }
);

export default Blog;
