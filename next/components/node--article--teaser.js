import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, formatDate } from "lib/utils";
import React, { useEffect } from "react";

const NodeArticleTeaser = ({ node }) => {
  return (
    <>
      <div className="blog-item text-center" key={node.id}>
        <Link
          href={node.path.alias}
          className="no-underline hover:text-blue-600"
        >
          {node.field_image_media &&
            node.field_image_media.field_media_image.uri.url && (
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
                    node.field_image_media.field_media_image.resourceIdObjMeta
                      .alt
                  }
                />
              </figure>
            )}
          <h2 className="mb-4 text-left">{node.title}</h2>
          <div className="mb-4 text-gray-600">
            {node.uid?.display_name ? (
              <span>
                Posted by{" "}
                <span className="font-semibold">{node.uid?.display_name}</span>
              </span>
            ) : null}
            <span> - {formatDate(node.created)}</span>
          </div>
        </Link>
      </div>
    </>
  );
};
export default NodeArticleTeaser;
