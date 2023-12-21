import React from "react";
import { wrapper } from "../store/reducers/store";
import { getGlobalElements } from "../store/actions/commonAction";
import { drupal } from "../lib/drupal";
import Layout from "../components/layout";
import NodeArticleTeaser from "../components/node--article--teaser";
import BannerSlider from "../components/bannerSlider";

const IndexPage = ({ nodes, slider }) => {
  return (
    <Layout description="A Next.js site powered by a Drupal backend.">
      <BannerSlider slider={slider} />
      <section className="mt-3 mb-3">
        <div className="container">
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
    try {
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
            include:
              "uid,field_image_media,field_image_media.field_media_image",
            sort: "-field_order",
          },
        }
      );

      // Fetch data from Drupal for sliders
      const slider = await drupal.getResourceCollectionFromContext(
        "node--home_slider",
        context,
        {
          params: {
            "filter[status]": 1,
            "fields[node--home_slider]":
              "title,path,field_order,field_image_media,uid,created",
            include:
              "uid,field_image_media,field_image_media.field_media_image",
            sort: "field_order",
          },
        }
      );

      let complete = "ok";
      return {
        props: { complete, nodes, slider },
        revalidate: 60,
      };
    } catch (error) {
      // Handle the error here, you can log it or dispatch another action
      console.error("Error in getStaticProps:", error);
      // You might want to return an error payload or redirect to an error page
      return {
        props: { error: "An error occurred while fetching data." },
        revalidate: 60,
      };
    }
  }
);

// Exporting the wrapped component
export default IndexPage;
