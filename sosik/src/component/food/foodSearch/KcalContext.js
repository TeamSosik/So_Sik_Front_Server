import React from "react";
import { useNavigate } from "react-router-dom";

const KcalContext = ({ data }) => {
  // 필드
  const navigation = useNavigate();
  // 상태

  // 메서드 상세페이지 이동
  const handleFoodCardClick = (foodId) => {
    // const foodId = e.target.id;
    console.log(foodId);
    navigation(`/food/${foodId}`);
  };

  // view

  return (
    <div
      className="kcalContex"
      onClick={() => handleFoodCardClick(data.foodId)}
    >
      {/* titleBox */}

      {/* contentBox */}
      <img src={data.url} className="kcalContextContentBox" />
      <div className="kcalContexTitle">
        <span>{data.name}</span>
      </div>
      {/* 칼로리 */}
      <span className="brand">{data.brand}</span>
    </div>
  );
};

export default KcalContext;
