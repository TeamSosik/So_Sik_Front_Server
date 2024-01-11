import React from 'react';

const RecdKcalSection3 = ({mealList}) => {

  // 필드
  const nutrientDetails = ["탄수화물", "단백질", "지방", "kcal"];
  const totalIntakeValues = [0, 0, 0, 0];

  mealList.forEach((data) => {
    totalIntakeValues[0] += data.calculationCarbo;
    totalIntakeValues[1] += data.calculationProtein;
    totalIntakeValues[2] += data.calculationFat;
    totalIntakeValues[3] += data.calculationKcal;
  });

  // 상태

  // 메서드

  // view
  const totalIntakeTitleView = "오늘의 총 섭취 영양소";

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

        <div className="total-intake-title">
          {totalIntakeTitleView}
        </div>

        <div className="total-intake-content">
          {totalIntakeView}
        </div>
      </div>
    </div>
  );
};

export default RecdKcalSection3;