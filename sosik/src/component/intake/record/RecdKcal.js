import React, { createContext, useEffect, useState } from "react";
import "./recdKcal.css";
import RecdKcalSection2 from "./RecdKcalSection2.js";
import RecdKcalSection3 from "./RecdKcalSection3.js";
import { Row, Col } from "react-bootstrap";
import Recdbutton from "./RecdButton.js";
import axios from "axios";
import Loading from "../../common/spinners/Loading.js";
import Calendarview from "../../intake/calendar/Calendarview.js";
import Inputkcal from "../Inputkcal.js";
import RecdKcalSectionNutrient from "./RecdKcalSection3-nutrient.js";
import KcalChart from "../KcalChart.js";

export const RecdKcalContext = createContext();

const RecdKcal = () => {

  const [mealList, setMealList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadDate, setLoadDate] = useState("");

  const getData = async () => {
    try {
      const accesstoken = JSON.parse(sessionStorage.getItem("accesstoken"));
      const refreshtoken = JSON.parse(sessionStorage.getItem("refreshtoken"));

      // const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
      const currentUTC = new Date();
      const koreaTimeOffset = 9 * 60 * 60 * 1000;
      const koreaTime = new Date(currentUTC.getTime() + koreaTimeOffset);
      // 오늘 날짜
      const todayInKorea = koreaTime.toISOString().split("T")[0]; // yyyy-MM-dd 형식

      const url = `/intake/v1/${todayInKorea}`;

      const response = await axios({
        method: "get",
        url: url,
        baseURL: "http://43.200.224.252:5056",
        headers: {
          Authorization: accesstoken,
          refreshtoken: refreshtoken,
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
    }
  };

  // 섭취 음식 list를 mealList에 담기
  const addMealList = async () => {
    const data = await getData();

    if (data) {
      setMealList(() => {
        return data.data.result;
      });
    }
  };

  // 섭취 음식 list를 mealList에 담기
  const addMealList2 = async (date) => {
    const data = await getData2(date);

    if (data) {
      setMealList(() => {
        return data.data.result;
      });
    }
  };

  // 섭취 음식 목록 불러오기
  const getData2 = async (date) => {
    try {
      const accesstoken = JSON.parse(sessionStorage.getItem("accesstoken"));
      const refreshtoken = JSON.parse(sessionStorage.getItem("refreshtoken"));

      const url = `/intake/v1/${date}`;

      const response = await axios({
        method: "get",
        url: url,
        baseURL: "http://43.200.224.252:5056",
        headers: {
          Authorization: accesstoken,
          refreshtoken: refreshtoken,
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (e) {}
  };

  // 처음 페이지 들어왔을 때 실행
  useEffect(() => {
    setLoading(true);

    addMealList();
  }, []);

  // view()

  // 로딩 화면
  if (loading) {
    return <Loading />;
  }
  const highFunction = (text) => {
    addMealList2(text);
    setLoadDate(text);
  };
  return (
    <RecdKcalContext.Provider value={{ addMealList }}>
      <Recdbutton defaultRadioValue={"1"}></Recdbutton>
      <Row className="kcal-info">
        <Col>
          <Inputkcal props={loadDate} />
        </Col>
        <Col>
          <KcalChart mealList={mealList} props={loadDate} />
        </Col>
        <Col>
          <Calendarview propFunction={highFunction} mealList={mealList}/>
        </Col>
      </Row>
      <RecdKcalSection2
        mealList={mealList}
        addMealList={addMealList}
        props={loadDate}
      />
      <RecdKcalSectionNutrient props={loadDate} />
      <RecdKcalSection3 mealList={mealList} />
    </RecdKcalContext.Provider>
  );
};

export default RecdKcal;
