import React, { navigation } from "react";

const KcalContext = ({ data }) => {
  // 필드
  const kcalUnit = "kcal"; // 칼로리 단위
  const gUnit = "g"; // g 단위
  const countUnit = "개";
  const nutrientList = ["칼로리", "지방", "탄수화물", "단백질"];

  // 상태

  // 메서드
  const handleFoodNameClick = (e) => {
    const foodId = e.target.id;
    navigation(`/food/${foodId}`);
  };

  // view

  return (
    <div className="kcalContex" onClick={handleFoodNameClick}>
      {/* titleBox */}

      {/* contentBox */}
      <img src={data.url} className="kcalContextContentBox" />
      <div className="kcalContexTitle">
        <span>{data.title}</span>
      </div>
      {/* 칼로리 */}
      <span className="brand">{data.brand}</span>
    </div>
  );
};

export default KcalContext;
