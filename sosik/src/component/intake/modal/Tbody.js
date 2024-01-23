import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { RecdKcalSection2Context } from '../record/RecdKcalSection2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RecdKcalContext } from '../record/RecdKcal';

const Tbody = ({data, handleModalTogle, handleDataListChange}) => {

  // 필드
  const {addMealList} = useContext(RecdKcalContext);
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
    navigation(`/food/${foodId}`);

  }


  // 섭취량이 변경되면 호출된다.
  const handleFoodAmountChange = (e) => {
    const {name, value} = e.target;

    setFoodAmount(() => {
      return {
        [name]: value
      }
    });
  }

  // 섭취 음식 등록
  const handleIntakeRegistrationBtnClick = async (e) => {

    if(isNaN(foodAmount.foodAmount)) {
      alert("숫자를 입력해주세요");
    }

    const calculationCarbo = data.carbo * foodAmount.foodAmount / 100;
    const calculationProtein = data.protein * foodAmount.foodAmount / 100;
    const calculationFat = data.fat * foodAmount.foodAmount / 100;
    const calculationKcal = data.kcal * foodAmount.foodAmount / 100;

    const accesstoken = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshtoken = JSON.parse(sessionStorage.getItem("refreshtoken"));

    const intakeData = {
      foodId: data.foodId,
      calculationCarbo: calculationCarbo,
      calculationProtein: calculationProtein,
      calculationFat: calculationFat,
      calculationKcal: calculationKcal,
      foodAmount: foodAmount.foodAmount,
      category: category
    }
    const jsonIntakeData = JSON.stringify(intakeData);

    // 요청하기
    try {
      const response = await axios({

        method: "post",
        url: "/intake/v1/food",
        baseURL: "",
        headers: {
          "Content-Type": "application/json",
          Authorization: accesstoken,
          refreshtoken: refreshtoken
        },
        data: jsonIntakeData
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
    } catch(e) {
      console.log(e);
    }

  }

  // 처음 렌더링 될 때 실행
  const init = () => {
    
    setFoodAmount(() => {
      return defaultFoodAmount;
    });
  }

  // view

  // 처음 시작
  useEffect(() => {
    
    init();
    
  }, [data]);

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
            value={foodAmount.foodAmount}
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