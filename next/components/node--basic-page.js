import Image from "next/image";
import { absoluteUrl, formatDate } from "../lib/utils";

const NodeBasicPage = ({ node, ...props }) => {
  return (
    <section className="mt-5 blog-details" {...props}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="">{node.title}</h1>
            <div className="mb-4 text-gray-600">
              {node.uid?.display_name ? (
                <span>
                  Posted by{" "}
                  <span className="font-semibold">
                    {node.uid?.display_name}
                  </span>
                </span>
              ) : null}
              <span> - {formatDate(node.created)}</span>
            </div>
            {node.body?.processed && (
              <div
                dangerouslySetInnerHTML={{ __html: node.body?.processed }}
                className="content"
              />
            )}
          </div>
          <div className="col-md-6">
            <figure>
              <Image
                src={absoluteUrl(
                  node.field_image_media.field_media_image.uri.url
                )}
                loader={({ src, width }) => {
                  return src + "?w=" + width;
                }}
                width={
                  node.field_image_media.field_media_image.resourceIdObjMeta
                    .width
                }
                height={
                  node.field_image_media.field_media_image.resourceIdObjMeta
                    .height
                }
                alt={
                  node.field_image_media.field_media_image.resourceIdObjMeta.alt
                }
                priority
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NodeBasicPage;
