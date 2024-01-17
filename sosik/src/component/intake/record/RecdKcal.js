import React, { createContext, useEffect, useState } from "react";
import "./recdKcal.css";
import RecdKcalSection2 from "./RecdKcalSection2.js";
import RecdKcalSection3 from "./RecdKcalSection3.js";
import Recdbutton from "./RecdButton.js";
import axios from "axios";
import Loading from "../../common/spinners/Loading.js";
import Inputkcal from "../Inputkcal.js";

export const RecdKcalContext = createContext();

const RecdKcal = () => {
  // 필드

  // 상태
  const [mealList, setMealList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 메서드

  // 섭취 음식 목록 불러오기
  const getData = async () => {
    try {
      const member = JSON.parse(localStorage.getItem("member"));
      const accesstoken = JSON.parse(localStorage.getItem("accesstoken"));
      const refreshtoken = JSON.parse(localStorage.getItem("refreshtoken"));

      const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
      const currentUTC = new Date();
      const koreaTimeOffset = 9 * 60;
      const koreaTime = new Date(
        currentUTC.getTime() + koreaTimeOffset * 60 * 1000
      );
      // 오늘 날짜
      const todayInKorea = koreaTime.toISOString().split("T")[0]; // yyyy-MM-dd 형식

      console.log(todayInKorea);
      const data = {
        memberId: member.memberId,
        createdAt: todayInKorea,
      };

      console.log(member.memberId);

      const response = await axios({
        method: "get",
        url: "/intake/",
        baseURL: "http://localhost:5056",
        headers: {
          Authorization: accesstoken,
          refreshtoken: refreshtoken,
          "Content-Type": "application/json",
        },
        params: data,
      });

      console.log("************* 응답 성공 *****************");

      return response;
    } catch (e) {
      console.log("************* 에러 발생 ************");
      console.log(e);
    }
    setLoading(false);
  };

  // 섭취 음식 list를 mealList에 담기
  const addMealList = async () => {
    const data = await getData();

    console.log(data);

    if (data) {
      setMealList(() => {
        return data.data.result;
      });
    }
  };

  // 처음 페이지 들어왔을 때 실행
  useEffect(() => {
    setLoading(true);

    addMealList();
  }, []);

  // view

  // 로딩 화면
  if (loading) {
    return <Loading />;
  }

  return (
    <RecdKcalContext.Provider value={{ addMealList }}>
      <div>
        <Recdbutton></Recdbutton>
        <Inputkcal></Inputkcal>
        <RecdKcalSection2 mealList={mealList} />
        <RecdKcalSection3 mealList={mealList} />
      </div>
    </RecdKcalContext.Provider>
  );
};

export default RecdKcal;
