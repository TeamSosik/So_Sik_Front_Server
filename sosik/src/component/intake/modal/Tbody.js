import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { RecdKcalSection2Context } from "../record/RecdKcalSection2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RecdKcalContext } from "../record/RecdKcal";
import {
  faCirclePlus,
  faMagnifyingGlass,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { BeatLoader } from "react-spinners";

const Tbody = ({ data, handleModalTogle, handleDataListChange }) => {
  // 필드
  const { addMealList } = useContext(RecdKcalContext);
  const defaultFoodAmount = {
    foodAmount: "",
  };
  const navigation = useNavigate();

  const { mealViewName: category, handleShowMealView } = useContext(
    RecdKcalSection2Context
  );

  // 상태
  const [foodAmount, setFoodAmount] = useState(defaultFoodAmount);

  // 메서드
  // 음식 상세페이지로 이동한다.
  const handleFoodNameClick = (e) => {
    const foodId = e.target.id;
    window.open(`/food/${foodId}`, "_blank");
  };

  // 섭취량이 변경되면 호출된다.
  const handleFoodAmountChange = (e) => {
    const { name, value } = e.target;

    setFoodAmount(() => {
      return {
        [name]: value,
      };
    });
  };

  // 섭취 음식 등록
  const handleIntakeRegistrationBtnClick = async (e) => {
    
    if (isNaN(foodAmount.foodAmount)) {
      alert("숫자를 입력해주세요");
      return;
    }

    if(foodAmount.foodAmount <= 0) {
      const message = "섭취량을 입력해주세요";
      alert(message);
      return;
    }

    const brand = data.manufacturer;
    const calculationCarbo = (data.carbo * foodAmount.foodAmount) / 100;
    const calculationProtein = (data.protein * foodAmount.foodAmount) / 100;
    const calculationFat = (data.fat * foodAmount.foodAmount) / 100;
    const calculationKcal = (data.kcal * foodAmount.foodAmount) / 100;

    const accesstoken = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshtoken = JSON.parse(sessionStorage.getItem("refreshtoken"));

    const intakeData = {
      foodId: data.foodId,
      brand: data.manufacturer,
      calculationCarbo: calculationCarbo,
      calculationProtein: calculationProtein,
      calculationFat: calculationFat,
      calculationKcal: calculationKcal,
      foodAmount: foodAmount.foodAmount,
      category: category,
    };
    const jsonIntakeData = JSON.stringify(intakeData);

    // 요청하기
    try {
      const response = await axios({
        method: "post",
        url: "/intake/v1/food",
        baseURL: "http://43.200.224.252:5056",
        headers: {
          "Content-Type": "application/json",
          Authorization: accesstoken,
          refreshtoken: refreshtoken,
        },
        data: jsonIntakeData,
      });

      // modal 닫기
      handleModalTogle(false);
      // 섭취 리스트로 이동하기
      handleShowMealView(category);
      // 섭취 목록 불러오기
      addMealList();
      // 모달 비우기
      handleDataListChange([]);

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  // 처음 렌더링 될 때 실행
  const init = () => {
    setFoodAmount(() => {
      return defaultFoodAmount;
    });
  };

  // view

  // 처음 시작
  useEffect(() => {

    init();

    return init();
  }, [data]);

  return (
    <tbody>
      <td
        style={{
          paddingTop: "20px",
          width: "12%",
          textAlign: "center",
          fontWeight: "bolder",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <div
          className="foodName"
          id={data.foodId}
          onClick={handleFoodNameClick}
        >
          {data.name}
        </div>
      </td>
      <td
        style={{
          width: "15%",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {data.manufacturer}
      </td>
      <td
        style={{
          width: "8%",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {data.carbo}
      </td>
      <td
        style={{
          width: "6%",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {data.protein}
      </td>
      <td
        style={{
          width: "6%",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {data.fat}
      </td>
      <td
        style={{
          width: "6%",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {data.kcal}
      </td>
      <td style={{ marginLeft: "7%", width: "6%", textAlign: "right" }}>
        <input
          type="text"
          name="foodAmount"
          value={foodAmount.foodAmount}
          onChange={handleFoodAmountChange}
          style={{ width: "50px" }}
        />
      </td>
      <td style={{ width: "6%", textAlign: "center" }}>
        <FontAwesomeIcon
          icon={faCirclePlus}
          style={{ color: "#59bd82" }}
          size="lg"
          className="registrationBtn"
          onClick={handleIntakeRegistrationBtnClick}
        />
      </td>
    </tbody>
  );
};

export default Tbody;
