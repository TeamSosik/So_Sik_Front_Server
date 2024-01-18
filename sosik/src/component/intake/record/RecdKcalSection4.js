import React from 'react';

const RecdKcalSection4 = ({realMealTitleName, mealList}) => {

  // 필드
  const nutrientDetails = ["탄수화물", "단백질", "지방", "kcal"];
  const totalIntakeValues = [0, 0, 0, 0];
  const totalIntakeSubeViewName = "섭취 영양소";

  // 상태

  // 메서드

  // view

  const totalIntakeTitle = (
    <div className="total-intake-title">
      <div className="total-intake-name1">{realMealTitleName}</div>
      <div className="total-intake-name2">{totalIntakeSubeViewName}</div>
    </div>
  );

  mealList.forEach((data) => {
    totalIntakeValues[0] += data.calculationCarbo;
    totalIntakeValues[1] += data.calculationProtein;
    totalIntakeValues[2] += data.calculationFat;
    totalIntakeValues[3] += data.calculationKcal;
  });

  const totalIntakeView = nutrientDetails.map((data, index) => {
    return (
      <div key={index} className="total-intake">
        <div className="total-intake-name1">{data}</div>
        <div className="total-intake-name2">{Math.round(totalIntakeValues[index] * 100) / 100}</div>
      </div>
    );
  });

  return (
    <div className="recd-kcal-section4">

      <div className="total-intake-content">

        {totalIntakeTitle}
        {totalIntakeView}

      </div>
    </div>
  );
};

export default RecdKcalSection4;