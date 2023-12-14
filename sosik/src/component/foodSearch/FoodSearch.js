import React, { useState } from "react";
import "./foodSearch.css";
import KcalContext from "./KcalContext.js";
import SearchBox from "./SearchBox.js";
import PageButtonBox from "./PageButtonBox.js";

const FoodSearch = () => {
  // 필드
  const defaultData = {
    itemList: [
      {
        title: "사과",
        kcalData: {
          count: 1, // 개수
          kcal: 72,
          fat: 0.26, // 지방
          carbo: 19.06, // 탄수화물
          protien: 0.36,
        },
      },
      {
        title: "사과",
        kcalData: {
          count: 1, // 개수
          kcal: 72,
          fat: 0.26, // 지방
          carbo: 19.06, // 탄수화물
          protien: 0.36,
        },
      },
      {
        title: "사과",
        kcalData: {
          count: 1, // 개수
          kcal: 72,
          fat: 0.26, // 지방
          carbo: 19.06, // 탄수화물
          protien: 0.36,
        },
      },
      {
        title: "사과",
        kcalData: {
          count: 1, // 개수
          kcal: 72,
          fat: 0.26, // 지방
          carbo: 19.06, // 탄수화물
          protien: 0.36,
        },
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

  return (
    <div className="foodSearchBox">
      {/* searchBox */}
      <SearchBox />

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
