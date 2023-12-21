import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "lib/utils";
import { config } from "../config";
import { useRouter } from "next/router";

const InnerHeroSection = ({
  title,
  desktop_banner_img,
  mobile_banner_img,
  parentName,
  _class,
}) => {
  const router = useRouter();
  const routerArray = router.asPath.split("/");

  return (
    <section className="inner-hero-banner">
      <div className="banner-content-wrapper">
        <figure>
          {desktop_banner_img?.uri?.url && (
            <Image
              src={absoluteUrl(desktop_banner_img.uri.url)}
              loader={({ src, width }) => {
                return src + "?w=" + width;
              }}
              width={desktop_banner_img.resourceIdObjMeta.width}
              height={desktop_banner_img.resourceIdObjMeta.height}
              alt={desktop_banner_img.resourceIdObjMeta.alt}
              priority
            />
          )}
        </figure>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcumb">
                <ul>
                  <li>
                    <Link href={config.nextBaseUrl + "/"}>Home</Link>
                  </li>
                  {parentName && routerArray.length == 3 && (
                    <li>{parentName}</li>
                  )}
                  {parentName && routerArray.length == 4 && (
                    <li>{parentName}</li>
                  )}
                  {title && <li>{title}</li>}
                </ul>
              </div>
            </div>
            {title && <h1>{title}</h1>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerHeroSection;
