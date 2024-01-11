import React from "react";

/**
 * 기능 : 칼로리 정보 컨텍스트
 * @returns
 */
const KcalContext = ({ data }) => {
  // 필드
  const kcalUnit = "kcal"; // 칼로리 단위
  const gUnit = "g"; // g 단위
  const countUnit = "개";
  const nutrientList = ["칼로리", "지방", "탄수화물", "단백질"];

  // 상태

  // 메서드

  // view

  return (
    <div className="kcalContex">
      {/* titleBox */}
      <div className="kcalContexTitle">
        <span>{data.title}</span>
      </div>
      {/* contentBox */}
      <div className="kcalContextContentBox">
        {/* 칼로리 */}
        <div className="content1">
          <span>{data.kcalData.count}</span>
          <span>{countUnit} </span>
          <span>{nutrientList[0]}: </span>
          <span>{data.kcalData.kcal}</span>
          <span>{kcalUnit}</span>
        </div>
        {/* 지방 */}
        <div className="content2">
          {/* 지방 */}
          <span>{nutrientList[1]}: </span>
          <span>{data.kcalData.fat}</span>
          <span>{gUnit}</span>
          {/* 탄수화물 */}
          <span>{nutrientList[2]}: </span>
          <span>{data.kcalData.carbo}</span>
          <span>{gUnit}</span>
          {/* 단백질 */}
          <span>{nutrientList[3]}: </span>
          <span>{data.kcalData.protien}</span>
          <span>{gUnit}</span>
        </div>
      </div>
    </div>
  );
};

export default KcalContext;
