import { drupal } from "../../lib/drupal";
import { NodeBasicPage } from "../../components/node--basic-page";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { wrapper } from "../../store/reducers/store";
import { getGlobalElements } from "../../store/actions/commonAction";

export default function NodePage({ resource }) {
  if (!resource) return null;
  const router = useRouter();

  return (
    <Layout
      title={resource.title}
      description={resource.title + " description"}
    >
      {resource.type === "node--blog" && <NodeBasicPage node={resource} />}
      {/* {resource.type === "node--article" && <NodeArticle node={resource} />} */}
    </Layout>
  );
}

export async function getStaticPaths(context) {
  return {
    paths: await drupal.getStaticPathsFromContext(["node--blog"], context),
    fallback: "blocking",
  };
}

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    await store.dispatch(getGlobalElements());

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

    let complete = "ok";
    return {
      props: { complete, resource },
      revalidate: 60,
    };
  }
);
