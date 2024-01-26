import React from "react";
import { useNavigate } from "react-router-dom";

const KcalContext = ({ data }) => {
  // 필드
  const navigation = useNavigate();
  // 상태
  console.log(data);
  // 메서드 상세페이지 이동
  const handleFoodCardClick = (foodId) => {
    window.open(`/food/${foodId}`, "_blank");
  };

  // view

  return (
    <div
      className="kcalContex"
      onClick={() => handleFoodCardClick(data.foodId)}
    >
      {/* titleBox */}

      {/* contentBox */}
      <img src={data.image} className="kcalContextContentBox" />
      <div className="kcalContexTitle">
        <span>{data.name}</span>
      </div>
      {/* 칼로리 */}
      <span className="brand">{data.manufacturer}</span>
    </div>
  );
};

export default KcalContext;
