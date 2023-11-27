import React from "react";
import "../../common/css/hojin/section2.css";
import Section2Component from "./Section2Component.js";
import { BrowserRouter, Router, Routes } from "react-router-dom";

const Section2 = () => {
  // 변수
  const dumyData = [
    {
      alt: "image1",
      image: "https://www.k-health.com/news/photo/201704/29636_16102_3054.jpg",
      content: {
        c1: "유저들과 소통하며 즐기는",
        c2: "SNS 피드확인",
      },
      url: "#",
    },
    {
      alt: "image2",
      image:
        "https://i.namu.wiki/i/CPgMqh7UvLocZ8EAXIk2MMV9yuS1HZWi2ZZvaerHhczgBQHJCKRBEfMHliRbm3Gp8SU74GV6Xvo59UOcPylf6g.webp",
      content: {
        c1: "오늘의 목표 칼로리는 얼마?",
        c2: "Calories 설정",
      },
      url: "#",
    },
    {
      alt: "image3",
      image:
        "https://cdn.healthinnews.co.kr/news/photo/202003/12742_14189_53.jpg",
      content: {
        c1: "지루한 식단 공유는 그만!",
        c2: "Ranking 확인",
      },
      url: "#",
    },
  ];
  // const default

  // 상태

  // 메서드

  // view
  // data view
  const dataList = dumyData.map((data, index) => {
    return <Section2Component key={index} data={data} />;
  });

  // 화면 view
  const view = <div className="section section2">{dataList}</div>;

  return view;
};

export default Section2;
