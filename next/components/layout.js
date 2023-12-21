import React, { useEffect } from "react";
import Head from "next/head";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import { config } from "../config";
import { useRouter } from "next/router";
import { PreviewAlert } from "components/preview-alert";
import { NextSeo } from "next-seo";
import { useCommonContext } from "../context/CommonContext";
import common_og from "../public/assets/images/common_og.png";

const Layout = ({ title, description, ogImage, keyword, children }) => {
  let test_loading = "";
  const { commonState } = useCommonContext();
  const { asPath } = useRouter();
  const pathArr = asPath.split("/");
  const _class = pathArr[pathArr.length - 1];

  useEffect(() => {
    if (commonState) {
      document.body.classList.remove("set-loader");
    }
    return () => {
      document.body.classList.add(undefined);
    };
  }, [commonState]);

  return (
    <>
      <PreviewAlert />
      <NextSeo
        title={
          asPath === "/" ? config.siteName : `${title} - ${config.siteName}`
        }
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`}
        openGraph={{
          title,
          description,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`,
          images: [
            {
              url:
                process.env.NEXT_IMAGE_DOMAIN +
                (ogImage?.uri?.url ? ogImage.uri.url : common_og.src),
              width: ogImage?.resourceIdObjMeta.width
                ? ogImage.resourceIdObjMeta.width
                : common_og.width,
              height: ogImage?.resourceIdObjMeta.height
                ? ogImage.resourceIdObjMeta.height
                : common_og.height,
            },
          ],
        }}
      />
      {keyword && (
        <Head>
          <meta name="keyword" content={keyword} />
        </Head>
      )}
      <div
        className={
          asPath === "/"
            ? "page-wrapper homepage"
            : "page-wrapper innerpage " + _class
        }
      >
        {commonState ? (
          <>
            {/* header section */}
            <Header headerElements={commonState?.headermenus} />

            {/* main body section */}
            <div className="main-wrapper">{children}</div>

            {/* footer section */}
            <Footer
              footermenus={commonState?.footermenus}
              copyright={commonState?.copyright}
              socialMedia={commonState?.socialMedia}
            />
          </>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </>
  );
};

export default Layout;
