import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { absoluteUrl } from "lib/utils";

const BannerSlider = ({ slider }) => {
  useEffect(() => {}, [slider]);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 2000,
    arrows: true,
    dots: false,
    autoplaySpeed: 1000,
  };

  return (
    <section className="banner-slider">
      <div className="row">
        {slider?.length && (
          <Slider {...settings}>
            {slider.map((node) => (
              <div key={node.id}>
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
                    // layout="fill"
                    priority
                  />
                  <figcaption className="slider-content">
                    <h2>{node.title}</h2>
                  </figcaption>
                </figure>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default BannerSlider;
