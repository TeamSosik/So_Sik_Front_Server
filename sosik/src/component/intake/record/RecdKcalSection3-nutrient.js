import React from "react";

const RecdKcalSection3_nutrient = ({ mealList }) => {
  // 필드
  const nutrientDetails = ["탄수화물", "단백질", "지방", "일일목표kcal"];
  const totalIntakeValues = [
    mealList.carbohydrate,
    mealList.protein,
    mealList.province,
    mealList.dayTargetKcal,
  ];

  // 상태

  // 메서드

  // view
  const totalIntakeTitleView = "권장 영양 섭취 비율";

  const totalIntakeView = nutrientDetails.map((data, index) => {
    return (
      <div key={index} className="total-intake">
        <p className="total-intake-name1">{data}</p>
        <p className="total-intake-name2">{totalIntakeValues[index]}</p>
      </div>
    );
  });

  return (
    <div>
      <div className="recd-kcal-section3">
        <div className="total-intake-title">{totalIntakeTitleView}</div>

        <div className="total-intake-content">{totalIntakeView}</div>
      </div>
    </div>
  );
};

export default RecdKcalSection3_nutrient;
