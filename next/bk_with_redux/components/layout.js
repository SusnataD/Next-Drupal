import Link from "next/link";
import Head from "next/head";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
// import PreFooter from "./includes/prefooter";
import { config } from "../config";
import { useRouter } from "next/router";
import { PreviewAlert } from "components/preview-alert";
import { NextSeo } from "next-seo";

const Layout = ({ title, description, keyword, children }) => {
  const { asPath } = useRouter();
  const pathArr = asPath.split("/");
  const _class = pathArr[pathArr.length - 1];

  return (
    <>
      <PreviewAlert />
      <NextSeo
        title={
          asPath === "/" ? config.siteName : `${title} - ${config.siteName}`
        }
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`}
        // openGraph={{
        //   title,
        //   description,
        //   url: `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`,
        //   images: [
        //     {
        //       url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/meta.jpg`,
        //       width: 800,
        //       height: 600,
        //     },
        //   ],
        // }}
      />
      {keyword && (
        <Head>
          <meta name="keyword" content={keyword} />
        </Head>
      )}
      <Header />
      <div className={asPath === "/" ? "homepage" : "innerpage" + _class}>
        <div className="main-wrapper">{children}</div>
      </div>
      {/* <PreFooter /> */}
      <Footer />
    </>
  );
};

export default Layout;
