import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { Navigation, Pagination, Autoplay } from "swiper";
import "../../../node_modules/swiper/modules/autoplay/autoplay.js";
import "../../../node_modules/swiper/modules/navigation/navigation.js";
import "../../../node_modules/swiper/modules/pagination/pagination.js";

import "../../../node_modules/swiper/swiper-bundle.js";
import "swiper/css";
import "../../common/css/section1/section1.css";

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
            <img
              className="home-img"
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F8WQ5N%2Fbtshy5kxPYn%2FVJqr5MTjba7vLROZucajuk%2Fimg.png"
              alt="banner1"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="home-img"
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1J1Il%2FbtshzBDtGf9%2F6h8SzcjwurvggUYcRO7UaK%2Fimg.png"
              alt="banner2"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="home-img"
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3Rru3%2FbtshBmSUExv%2FRLgXbEOZhK4KVvs5TqsBKK%2Fimg.png"
              alt="banner3"
            ></img>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
