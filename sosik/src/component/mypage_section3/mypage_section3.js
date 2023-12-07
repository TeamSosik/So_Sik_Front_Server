import React, { useState } from "react";
import Feed from "../mypage_section3/mypage_myfeed";
const data = [
  {
    id: 0,
    url: "img/myfeed1.jpg",
  },
  {
    id: 1,
    url: "img/myfeed2.jpg",
  },

  {
    id: 2,
    url: "img/salad.jpg",
  },
  {
    id: 3,
    url: "img/myfeed1.jpg",
  },
  {
    id: 4,
    url: "img/myfeed2.jpg",
  },

  {
    id: 5,
    url: "img/salad.jpg",
  },
  {
    id: 6,
    url: "img/myfeed1.jpg",
  },
  {
    id: 7,
    url: "img/myfeed2.jpg",
  },

  {
    id: 8,
    url: "img/salad.jpg",
  },
  {
    id: 9,
    url: "img/myfeed1.jpg",
  },
  {
    id: 10,
    url: "img/myfeed2.jpg",
  },

  {
    id: 11,
    url: "img/salad.jpg",
  },
  {
    id: 12,
    url: "img/myfeed1.jpg",
  },
  {
    id: 13,
    url: "img/myfeed2.jpg",
  },

  {
    id: 14,
    url: "img/salad.jpg",
  },
  {
    id: 15,
    url: "img/myfeed1.jpg",
  },
  {
    id: 16,
    url: "img/myfeed2.jpg",
  },

  {
    id: 17,
    url: "img/salad.jpg",
  },
];
const Section3Component = () => {
  let [products, setProducts] = useState(data);
  return (
    <div className="Section3Component">
      <div className="semititle">
        <svg
          aria-label=""
          className="feedlogo"
          fill="currentColor"
          height="12"
          role="img"
          viewBox="0 0 24 24"
          width="12"
        >
          <rect
            fill="none"
            height="18"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            width="18"
            x="3"
            y="3"
          ></rect>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="9.015"
            x2="9.015"
            y1="3"
            y2="21"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="14.985"
            x2="14.985"
            y1="3"
            y2="21"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="21"
            x2="3"
            y1="9.015"
            y2="9.015"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="21"
            x2="3"
            y1="14.985"
            y2="14.985"
          ></line>
        </svg>
        <span className="mypost">내 게시물</span>
      </div>
      <div
        className="container"
        style={{
          height: "1200px",
          width: "100%",
          border: "#00C22B solid 2px ",
        }}
      >
        <div className="newfeed">
          {products.map((a, i) => {
            return <Feed products={a} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Section3Component;
