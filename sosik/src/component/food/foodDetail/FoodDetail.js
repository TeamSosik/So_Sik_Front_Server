import React, { useEffect, useState } from "react";
import "./foodDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../common/spinners/Loading.js";

const Fd_section1 = ({name}) => {
  return (
    <div className="fd-section1">
      <div className="food-name">{name}</div>
      <div className="food-content">
        <p>
          과일의 하나이다. 과육은 기본적으로 노란색에서 연두색 이며, 맛은
          품종마다 다르다. 아래 사과 품종 문단을 참고하자. 일반적으로 한국에서
          말하는 사과 맛은 달콤새콤 + 아삭아삭하게 씹히는 탄력이 있고 단단한
          과육의 식감을 말한다. 종마다 다르지만 잘 익은 사과는 껍질이 벗겨지지
          않은 상태에서도 청량감이 있는 좋은 냄새가 난다.
        </p>
      </div>
      <hr />
    </div>
  );
};

const Fd_section2 = ({data}) => {

  return (
    <div className="fd-section2">
      <div className="nutrient-info">
        <div className="nutrient-info-title1">영양정보</div>
        <div className="nutrient-info-title2">(100g 기준)</div>
      </div>

      <div className="nutrient-content">
        <div className="nutrient">
          <p className="nutrient-title1">탄수화물</p>
          <p className="nutrient-title2">{data.carbo}g</p>
        </div>
        <div className="nutrient">
          <p className="nutrient-title1">단백질</p>
          <p className="nutrient-title2">{data.protein}g</p>
        </div>
        <div className="nutrient">
          <p className="nutrient-title1">지방</p>
          <p className="nutrient-title2">{data.fat}g</p>
        </div>
        {/* <div className="nutrient">
          <p className="nutrient-title1">나트륨</p>
          <p className="nutrient-title2">100g</p>
        </div>
        <div className="nutrient">
          <p className="nutrient-title1">콜레스테롤</p>
          <p className="nutrient-title2">100g</p>
        </div>
        <div className="nutrient">
          <p className="nutrient-title1">탄수화물</p>
          <p className="nutrient-title2">100g</p>
        </div>
        <div className="nutrient">
          <p className="nutrient-title1">탄수화물</p>
          <p className="nutrient-title2">100g</p>
        </div>
        <div className="nutrient">
          <p className="nutrient-title1">탄수화물</p>
          <p className="nutrient-title2">100g</p>
        </div> */}
      </div>

      <div className="food-calorie">
        <div className="calorie-intake">
          <p className="kcal-title1">섭취열량</p>
          <p className="kcal-title2">{data.kcal}</p>
          <p className="kcal-title3">kcal</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

const Fd_section3 = () => {
  return (
    <div className="fd-section3">
      <div className="related-dishes">관련요리</div>

      <div className="related-dishes-content">
        <a href="#" className="related-dishes-name">
          # 사과샐러드
        </a>
        <a href="#" className="related-dishes-name">
          # 애플파이
        </a>
        <a href="#" className="related-dishes-name">
          # 사과쥬스
        </a>
      </div>
    </div>
  );
};

const FoodDetail = () => {

  // 필드
  const {id:foodId} = useParams();

  const defaultData = {
    foodId: "",
    name: "",
    carbo: "",
    protein: "",
    fat: "",
    kcal: "",
    size: "",
    createdBy: "",
    modifiedBy: "",
    createdAt: "",
    modifiedAt: ""
  }

  // 상태
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  // 메서드
  // 데이터 조회하기
  const getData = async () => {

    try {

      const response = await axios({
        method: "get",
        url: `/food/v1/${foodId}`,
        baseURL: "http://localhost:5056/",
        headers: {
          "Content-Type": "application/json"
        }

      });

      setLoading(false);

      return response;
    } catch(e) {
      console.log("******** 오류 해결 *******");
      console.log(e);
    }
  }

  const showData = async () => {

    const data = await getData();

    console.log("******* 데이터 확인!!!! ***********");
    console.log(data.data.result);

    setData(data.data.result);

  }

  // view

  // 처음 시작
  useEffect(() => {

    setLoading(true);

    showData();

  }, []);

  if(loading) {
    <Loading />
  }

  return (
    <div>
      <Fd_section1 name={data.name} />
      <Fd_section2 data={data} />
      <Fd_section3 />
    </div>
  );
};

export default FoodDetail;
