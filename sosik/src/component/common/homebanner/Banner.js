import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { Navigation, Pagination, Autoplay } from "swiper";
import banner_first from "../../../images/banner1.jpg";
import banner_second from "../../../images/banner2.jpg";
import "../../../../node_modules/swiper/modules/autoplay/autoplay.js";
import "../../../../node_modules/swiper/modules/navigation/navigation.js";
import "../../../../node_modules/swiper/modules/pagination/pagination.js";
import "../../../../node_modules/swiper/swiper-bundle.js";
import "swiper/css";
import "./banner.css";

SwipeCore.use([Navigation, Pagination, Autoplay]);

export default function home() {
  return (
    <div className="page-container">
      <div>
        <Swiper
          className="home-banner"
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          <SwiperSlide>
            <img className="home-img" src={banner_first} alt="banner1"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img className="home-img" src={banner_second} alt="banner2"></img>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
