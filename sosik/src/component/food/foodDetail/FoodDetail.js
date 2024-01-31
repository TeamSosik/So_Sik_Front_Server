import React, { useEffect, useState } from "react";
import "./foodDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../common/spinners/Loading.js";
import Error404 from "../../common/error/Error404.js";

const Fd_section1 = ({ data }) => {
  console.log(data);
  return (
    <div className="fd-section1">
      <div className="food-name">{data.name}</div>
      <img src={data.image} className="food-content"></img>
      <div className="related-dishes-content">
        <p className="related-dishes-name"># {data.manufacturer}</p>
      </div>
      <hr />
    </div>
  );
};

const Fd_section2 = ({ data }) => {
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
        <div className="nutrient">
          <p className="nutrient-title1">당류</p>
          <p className="nutrient-title2">{data.sugars}g</p>
        </div>
      </div>

      <div className="food-calorie">
        <div className="calorie-intake">
          <p className="kcal-title1">섭취열량</p>
          <p className="kcal-title2">{data.kcal}</p>
          <p className="kcal-title3">kcal</p>
        </div>
      </div>
    </div>
  );
};

const FoodDetail = () => {
  // 필드
  const { id: foodId } = useParams();

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
    modifiedAt: "",
  };
  const navigation = useNavigate();

  // 상태
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // 메서드
  // 데이터 조회하기
  const getData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/food/v1/${foodId}`,
        baseURL: "http://localhost:5056/",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const showData = async () => {
    const data = await getData();

    if(data) {
      setData(data.data.result);
      return;
    }
    setNotFound(true);
  };

  // view

  // 처음 시작
  useEffect(() => {
    setLoading(true);

    showData();
  }, []);

  if (loading) {
    <Loading />;
  }

  if(notFound) {
    return (<Error404 />);
  } 

  return (
    <div>
      <Fd_section1 data={data} />
      <Fd_section2 data={data} />
    </div>
  );
};

export default FoodDetail;
