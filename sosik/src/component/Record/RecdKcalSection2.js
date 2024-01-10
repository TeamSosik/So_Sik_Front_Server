import { faAngleLeft, faAngleRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import FoodModal from '../FoodModal/FoodModal';

const RecdKcalSection2 = ({mealList: mealDataList}) => {

  // 필드
  const nutrientDetails = ["탄수화물", "단백질", "지방", "kcal"];
  const mealTitleList = ["BREAKFAST", "LUNCH", "DINNER", "SNACKS"];
  const realMealTitleList = ["아침 식사", "점심 식사", "저녁 식사", "간식"];
  const defaultMealViewName = "BREAKFAST";
  let leftBtnMealTitle = "";
  let rightBtnMealTitle = "";

  // 상태
  const [mealViewName, setMealViewName] = useState(defaultMealViewName);// 아침, 점심, 저녁, 간식 화면 변경 상태

  // 메서드

  // category에 맞는 meal을 추출할 수 있습니다.
  const mealList = mealDataList.filter((data, index) => {
    return data.category === mealViewName;
  })

  // 화면 전환 버튼 클릭
  const handleMealTitleChangeBtnClick = (mealTitleName) => {
    setMealViewName(mealTitleName);
  }

  // view

  const nutrientStandardView = "(1인분 / 100g기준)";

  const nutrientDetailsView = nutrientDetails.map((data, index) => {
    return <div className="nutrient-name">{data}</div>;
  });

  // 식사 상태 표시 시작

  const index = mealTitleList.indexOf(mealViewName);
  const realMealTitleName = realMealTitleList[mealTitleList.indexOf(mealViewName)];
  

  leftBtnMealTitle = mealTitleList[index - 1];
  rightBtnMealTitle = mealTitleList[index + 1];

  if(index === 0) {
    leftBtnMealTitle = mealTitleList[mealTitleList.length - 1];
  }
  if(index === 3) {
    rightBtnMealTitle = mealTitleList[0];
  }

  // 식사 상태 표시 끝

  /**
   * TODO : 아침, 점심, 저녁, 간식 구분해서 뿌려주기 만들기!!!!!
   */
  const mealTitleView = (

    <div className="meal-title">
      <FontAwesomeIcon
        icon={faAngleLeft}
        size="2xs"
        style={{ color: "#000000", marginRight: 30 }}
        onClick={() => {
          handleMealTitleChangeBtnClick(leftBtnMealTitle);
        }}
      />
      {realMealTitleName}
      <FontAwesomeIcon
        icon={faAngleRight}
        size="2xs"
        style={{ color: "#000000", marginLeft: 30 }}
        onClick={() => {
          handleMealTitleChangeBtnClick(rightBtnMealTitle);
        }}
      />
    </div>
  );

  const mealListView = mealList.map((data, index) => {
    return (
      <div key={index} className="meal">
        {/* ***** 영양소 이름 시작 *****  */}

        <div className="meal-name">
          <div>{data.name}</div>
          <p>{nutrientStandardView}</p>
        </div>

        {/* ***** 영양소 이름 끝 *****  */}

        {/* ****** 영양소 내용 box 시작 **** */}

        <div className="nutrient">
          {/* 영양소 데이터 이름 */}
          <div className="nutrient-detail">{nutrientDetailsView}</div>
          {/* 가져온 영양소 데이터 */}
          <div className="nutrient-gram">
            <div className="nutrient-data">{data.calculationCarbo}</div>
            <div className="nutrient-data">{data.calculationProtein}</div>
            <div className="nutrient-data">{data.calculationFat}</div>
            <div className="nutrient-data">{data.calculationKcal}</div>
          </div>
        </div>

        {/* ****** 영양소 내용 box 끝 **** */}
      </div>

      // {/* **** meal box 끝 **** */}
    ); 
  });

  const modalBtn = (<FontAwesomeIcon
    className="additionMeal-button"
    icon={faCirclePlus}
    style={{ color: "#59bd82"}}
  />);

  const additionMealView = (

    <div className="additionMeal">

        <div className="additionMeal-name">
          <div>식사 추가하기</div>
        </div>

        <div className="additionMeal-button-content">

          <FoodModal modalBtn={modalBtn} />

        </div>

    </div>
  )


  return (

    <div className="recd-kcal-section2">

      {/* ********** meal-title box 시작 ************ */}

      {mealTitleView}

      {/* ********** meal-title box 끝************ */}

      {/* ****************** meal-content box 시작 *************** */}

      <div className="meal-content">
          {mealListView}
          {additionMealView}    
      </div>

      {/* ****************** meal-content box 끝 *************** */}

    </div>

  );
};

export default RecdKcalSection2;