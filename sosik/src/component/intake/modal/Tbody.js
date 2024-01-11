import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { RecdKcalSection2Context } from '../record/RecdKcalSection2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tbody = ({data, handleModalTogle}) => {

  // 필드
  const defaultFoodAmount = {
    foodAmount: ""
  }
  const navigation = useNavigate();

  const {mealViewName: category, handleShowMealView} = useContext(RecdKcalSection2Context);

  // 상태
  const [foodAmount, setFoodAmount] = useState(defaultFoodAmount);

  // 메서드
  // 음식 상세페이지로 이동한다.
  const handleFoodNameClick = (e) => {

    const foodId = e.target.id;
    console.log(foodId);
    navigation(`/food/${foodId}`);

  }


  // 섭취량이 변경되면 호출된다.
  const handleFoodAmountChange = (e) => {
    const {name, value} = e.target;
    console.log("value : ", value);

    setFoodAmount(() => {
      return {
        [name]: value
      }
    });
  }

  // 섭취 음식 등록
  const handleIntakeRegistrationBtnClick = async (e) => {

    console.log(`*********** data : ${data} ************`);
    console.log(data);
    console.log(typeof data);

    // 숫자인지 검사한다.
    console.log("foodAmount : ", foodAmount);
    console.log(typeof foodAmount);

    if(isNaN(foodAmount.foodAmount)) {
      alert("숫자를 입력해주세요");
    }

    const calculationCarbo = data.carbo * foodAmount.foodAmount;
    const calculationProtein = data.protein * foodAmount.foodAmount;
    const calculationFat = data.fat * foodAmount.foodAmount;
    const calculationKcal = data.kcal * foodAmount.foodAmount;
    // memberId
    const member = JSON.parse(localStorage.getItem("member"));
    const accesstoken = JSON.parse(localStorage.getItem("accesstoken"));
    const refreshtoken = JSON.parse(localStorage.getItem("refreshtoken"));

    const intakeData = {
      memberId: member.memberId,          // TODO controller에서 처리하는지 물어보기
      foodId: data.foodId,
      dayTargetCalorieId: 1,              // TODO 어디서 가져오는 거지?
      calculationCarbo: calculationCarbo,
      calculationProtein: calculationProtein,
      calculationFat: calculationFat,
      calculationKcal: calculationKcal,
      foodAmount: foodAmount.foodAmount,
      category: category
    }
    const jsonIntakeData = JSON.stringify(intakeData);

    console.log(intakeData);

    // 요청하기
    try {
      const response = await axios({

        method: "post",
        url: "/intake/food",
        baseURL: "",
        headers: {
          "Content-Type": "application/json",
          Authorization: accesstoken,
          refreshtoken: refreshtoken
        },
        data: jsonIntakeData
      });

      console.log(response);
      // modal 닫기
      handleModalTogle(false);
      // 섭취 리스트로 이동하기
      handleShowMealView(category);

      return response;
    } catch(e) {
      console.log(e);
    }

  }

  // view

  return (
    <tbody>
        <td style={{ width: "25%", textAlign: "center" }}>
          <div className='foodName' id={data.foodId} onClick={handleFoodNameClick}>{data.name}</div>
        </td>
        <td style={{ width: "25%", textAlign: "center" }}>
          {data.carbo}
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          {data.protein}
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          {data.fat}
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          {data.kcal}
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          <input
            type="text"
            name="foodAmount"
            defaultValue={""}
            onChange={handleFoodAmountChange}
            style={{ width: "50px" }}
          />
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          <FontAwesomeIcon className="registrationBtn" icon={faPlus} onClick={handleIntakeRegistrationBtnClick} />
        </td>
      </tbody>
  );
};

export default Tbody;