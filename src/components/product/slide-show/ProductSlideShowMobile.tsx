"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./slideshow.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

const ProductSlideShowMobile = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
      style={{
        width: "100vw",
        height: "500px",
      }}
      pagination={true}
        navigation={true}
        autoplay={{ delay: 3000 }}
        modules={[ Navigation, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlideShowMobile;
