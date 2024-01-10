import React, { useState } from "react";
import "../../common/css/record/recdKcal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import FoodModal from "../FoodModal/FoodModal";
import RecdKcalSection2 from "./RecdKcalSection2";
import RecdKcalSection3 from "./RecdKcalSection3";

const RecdKcal = () => {
  // 필드
  
  const defaultmealList = [
    {
      name: "된장찌개 BREAKFAST",
      foodId: 1,
      dayTargetCalorieId: 1,
      calculationCarbo: 50,
      calculationProtein: 50,
      calculationFat: 50,
      calculationKcal: 50,
      category: "BREAKFAST", //BREAKFAST, LUNCH, DINNER, SNACKS
      foodAmount: 200,
      createDate: "2020-12-12", // 현재 없음
    },
    {
      name: "된장찌개 LUNCH",
      foodId: 1,
      dayTargetCalorieId: 1,
      calculationCarbo: 50,
      calculationProtein: 50,
      calculationFat: 50,
      calculationKcal: 50,
      category: "LUNCH", //BREAKFAST, LUNCH, DINNER, SNACKS
      foodAmount: 200,
      createDate: "2020-12-12", // 현재 없음
    },
    {
      name: "된장찌개 LUNCH",
      foodId: 1,
      dayTargetCalorieId: 1,
      calculationCarbo: 50,
      calculationProtein: 50,
      calculationFat: 50,
      calculationKcal: 50,
      category: "LUNCH", //BREAKFAST, LUNCH, DINNER, SNACKS
      foodAmount: 200,
      createDate: "2020-12-12", // 현재 없음
    },
    {
      name: "된장찌개 DINNER",
      foodId: 1,
      dayTargetCalorieId: 1,
      calculationCarbo: 50,
      calculationProtein: 50,
      calculationFat: 50,
      calculationKcal: 50,
      category: "DINNER", //BREAKFAST, LUNCH, DINNER, SNACKS
      foodAmount: 200,
      createDate: "2020-12-12", // 현재 없음
    },
    {
      name: "된장찌개 SNACKS",
      foodId: 1,
      dayTargetCalorieId: 1,
      calculationCarbo: 50,
      calculationProtein: 50,
      calculationFat: 50,
      calculationKcal: 50,
      category: "SNACKS", //BREAKFAST, LUNCH, DINNER, SNACKS
      foodAmount: 200,
      createDate: "2020-12-12", // 현재 없음
    },
  ];


  // 상태
  const [mealList, setMealList] = useState(defaultmealList);

  // 메서드


  // view

  return (
    <>
      <RecdKcalSection2 mealList={mealList} />
      <RecdKcalSection3 mealList={mealList} />
    </>
  );
};

export default RecdKcal;
