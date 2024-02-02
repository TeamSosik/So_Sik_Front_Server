import {
  faAngleLeft,
  faAngleRight,
  faCirclePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useState } from "react";
import FoodModal from "../modal/FoodModal";
import axios from "axios";
import RecdKcalSection4 from "./RecdKcalSection4";

export const RecdKcalSection2Context = createContext();

const RecdKcalSection2 = ({ mealList: mealDataList, addMealList, props }) => {
  // 필드
  const nutrientDetails = ["탄수화물", "단백질", "지방", "kcal"];
  const mealTitleList = ["BREAKFAST", "LUNCH", "DINNER", "SNACKS"];
  const realMealTitleList = ["아침 식사", "점심 식사", "저녁 식사", "간식"];
  const defaultMealViewName = "BREAKFAST";
  let leftBtnMealTitle = "";
  let rightBtnMealTitle = "";
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  const isToday = formattedToday === props;
  
  // 상태
  const [mealViewName, setMealViewName] = useState(defaultMealViewName); // 아침, 점심, 저녁, 간식 화면 변경 상태

  // 메서드

  // category에 맞는 meal을 추출할 수 있습니다.
  const mealList = mealDataList.filter((data, index) => {
    return data.category === mealViewName;
  });

  // 화면 전환 버튼 클릭
  const handleMealTitleChangeBtnClick = (mealTitleName) => {
    setMealViewName(mealTitleName);
  };

  // 섭취 리스트로 이동하기
  const handleShowMealView = (mealViewName) => {
    setMealViewName(mealViewName);
  };

  const handleMealDeleteClick = async (id, e) => {
    const result = window.confirm("정말로 삭제하시겠습니까?");

    if (!result) {
      return;
    }

    const response = await deleteMeal(id);

    const status = response.status;

    if (status === 200) {
      addMealList();
    }
  };

  const deleteMeal = async (id) => {
    const accesstoken = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshtoken = JSON.parse(sessionStorage.getItem("refreshtoken"));

    const url = `http://localhost:5056/intake/v1/${id}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          authorization: accesstoken,
          refreshtoken: refreshtoken,
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  // view

  const nutrientDetailsView = nutrientDetails.map((data, index) => {
    return <div className="nutrient-name">{data}</div>;
  });

  // 식사 상태 표시 시작

  const index = mealTitleList.indexOf(mealViewName);
  const realMealTitleName =
    realMealTitleList[mealTitleList.indexOf(mealViewName)];

  leftBtnMealTitle = mealTitleList[index - 1];
  rightBtnMealTitle = mealTitleList[index + 1];

  if (index === 0) {
    leftBtnMealTitle = mealTitleList[mealTitleList.length - 1];
  }
  if (index === 3) {
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
        style={{ color: "#000000", marginRight: 30, cursor: "pointer" }}
        onClick={() => {
          handleMealTitleChangeBtnClick(leftBtnMealTitle);
        }}
      />
      {realMealTitleName}
      <FontAwesomeIcon
        icon={faAngleRight}
        size="2xs"
        style={{ color: "#000000", marginLeft: 30, cursor: "pointer" }}
        onClick={() => {
          handleMealTitleChangeBtnClick(rightBtnMealTitle);
        }}
      />
    </div>
  );

  const mealListView = mealList.map((data, index) => {

    const unit = "g(ml)";
    const nutrientStandardView = `섭취량 : ${data.foodAmount} ${unit}`;

    return (
      <div key={index} className="meal">
        {/* ***** 영양소 이름 시작 *****  */}
        <div className="meal-info">
          <div className="meal-name">{data.name}</div>
          <p className="meal-intake">{nutrientStandardView}</p>

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

        {/* 삭제 box 시작 */}
        {isToday && (
          <div className="meal-delete">
            <FontAwesomeIcon
              className="meal-delete-icon"
              icon={faTrash}
              style={{ color: "#59bd82" }}
              onClick={() => {
                handleMealDeleteClick(data.id);
              }}
            />
          </div>
        )}
        {/* 삭제 버튼 box 끝 */}

      </div>

      // {/* **** meal box 끝 **** */}
    );
  });

  const modalBtn = (
    <FontAwesomeIcon
      className="additionMeal-button"
      icon={faCirclePlus}
      size="xs"
      style={{ color: "#59bd82" }}
    />
  );

  const additionMealView = isToday && (
    <div className="additionMeal">
      <div className="additionMeal-name">
        <div>식사 추가하기</div>
      </div>

      <div className="additionMeal-button-content">
        <FoodModal modalBtn={modalBtn} />
      </div>
    </div>
  );

  return (
    <RecdKcalSection2Context.Provider
      value={{ mealViewName, handleShowMealView }}
    >
      <div className="recd-kcal-section2">
        {/* ********** meal-title box 시작 ************ */}

        {mealTitleView}

        {/* ********** meal-title box 끝************ */}

        {/* ****************** meal-content box 시작 *************** */}

        <div className="meal-content">

          {mealListView}
          {additionMealView}
          <RecdKcalSection4 realMealTitleName={realMealTitleName} mealList={mealList}  />
        
        </div>

        {/* ****************** meal-content box 끝 *************** */}
      </div>
    </RecdKcalSection2Context.Provider>
  );
};

export default RecdKcalSection2;
