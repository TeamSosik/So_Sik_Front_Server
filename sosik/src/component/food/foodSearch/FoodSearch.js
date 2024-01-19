import React, { useState } from "react";
import "./foodSearch.css";
import KcalContext from "./KcalContext.js";
import PageButtonBox from "./PageButtonBox.js";

const FoodSearch = () => {
  // 필드
  const defaultData = {
    itemList: [
      {
        title: "황금올리브",
        url: "https://sitem.ssgcdn.com/87/03/87/item/1000370870387_i1_750.jpg",
        brand: "BBQ",
      },
      {
        title: "사과",
        url: "https://media.istockphoto.com/id/184276818/ko/%EC%82%AC%EC%A7%84/%EB%A0%88%EB%93%9C-%EC%82%AC%EA%B3%BC%EB%82%98%EB%AC%B4.jpg?s=2048x2048&w=is&k=20&c=ha7OqiGpi8QruIPKcU6rix1-KN_fm210KTHjTFRb4Xk=",
        brand: "유기농",
      },
      {
        title: "나랑드사이다",
        url: "https://img.navimro.com/img/pi/full/K06626837.jpg",
        brand: "(주)동아오츠카",
      },
      {
        title: "마이구미(복숭아맛)",
        url: "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/9004313654776319-7a9e294a-1c93-4cb7-a520-534800a83c45.jpg",
        brand: "(주)오리온",
      },
      {
        title: "황금올리브",
        url: "https://sitem.ssgcdn.com/87/03/87/item/1000370870387_i1_750.jpg",
        brand: "BBQ",
      },
      {
        title: "사과",
        url: "https://media.istockphoto.com/id/184276818/ko/%EC%82%AC%EC%A7%84/%EB%A0%88%EB%93%9C-%EC%82%AC%EA%B3%BC%EB%82%98%EB%AC%B4.jpg?s=2048x2048&w=is&k=20&c=ha7OqiGpi8QruIPKcU6rix1-KN_fm210KTHjTFRb4Xk=",
        brand: "유기농",
      },
      {
        title: "나랑드사이다",
        url: "https://img.navimro.com/img/pi/full/K06626837.jpg",
        brand: "(주)동아오츠카",
      },
      {
        title: "마이구미(복숭아맛)",
        url: "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/9004313654776319-7a9e294a-1c93-4cb7-a520-534800a83c45.jpg",
        brand: "(주)오리온",
      },
      {
        title: "황금올리브",
        url: "https://sitem.ssgcdn.com/87/03/87/item/1000370870387_i1_750.jpg",
        brand: "BBQ",
      },
      {
        title: "사과",
        url: "https://media.istockphoto.com/id/184276818/ko/%EC%82%AC%EC%A7%84/%EB%A0%88%EB%93%9C-%EC%82%AC%EA%B3%BC%EB%82%98%EB%AC%B4.jpg?s=2048x2048&w=is&k=20&c=ha7OqiGpi8QruIPKcU6rix1-KN_fm210KTHjTFRb4Xk=",
        brand: "유기농",
      },
      {
        title: "나랑드사이다",
        url: "https://img.navimro.com/img/pi/full/K06626837.jpg",
        brand: "(주)동아오츠카",
      },
      {
        title: "마이구미(복숭아맛)",
        url: "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/9004313654776319-7a9e294a-1c93-4cb7-a520-534800a83c45.jpg",
        brand: "(주)오리온",
      },
    ],
  };

  // 상태
  const [item, setItem] = useState(defaultData);

  // 메서드

  // view
  // 칼로리 리스트
  const kcalContextList = item.itemList.map((data, index) => {
    return <KcalContext key={index} data={data} />;
  });
  // 버튼박스
  // 메서드
  // 음식 상세페이지로 이동한다.

  return (
    <div className="foodSearchBox">
      {/* contextBox */}
      <div className="kcalContexListBox">
        {/* context */}
        {kcalContextList}

        {/* TODO : div 박스를 나눌 지 생각해봐야 합니다. */}
        {/* ButtonBox */}
        <PageButtonBox />
      </div>
    </div>
  );
};

export default FoodSearch;
