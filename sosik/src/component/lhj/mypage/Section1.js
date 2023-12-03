import React, { useState } from "react";
import "../../../common/css/hojin/mypage/section1.css";
import MyWeight from "./MyWeight.js";
import MyInfo from "./MyInfo.js";
import MyIntroduction from "./MyIntroduction.js";
import MyActivity from "./MyActivity.js";

/**
 * 기능 : 메인페이지 body의 section1 부분
 */
const Section1 = () => {
  // 필드
  const introduction = `
    평일에는 녹색 채소들로 구성된 식다능ㄹ 구성하여 챌린지를 진행하고 있고, 주마에는 내려놓고 식사 중
    운동은 우[잍, 필라테스, 유산소 섞어서 주 5~6회 진행 중
    건강하고 맛잇는 시갓를 지향하고 체중보다는 체지방 감소에 신경쓰고자 한다.
    다른분들의 다양한 레시피를 배워서 맛있는 관리를 하고 싶어요~~!!
  `;

  const defaultInfo = {
    id: "fighting",
    createDate: new Date("2023/12/01").toString(),
    updateDate: new Date("2023/12/05").toString(),
    introduction: introduction,
    image: {
      url: "https://mblogthumb-phinf.pstatic.net/20150410_293/derred_1428643336530DwzP8_PNG/4624357399.png?type=w420",
      originName: "하트_뽕뿅.png",
      storedName: "12489123s1adf56s1fd.png",
      createDate: new Date("2023/12/02").toString(),
      updateDate: new Date("2023/12/03").toString(),
    },
    challenge: [
      {
        name: "Only녹색식단",
        count: 2,
      },
    ],
    weight: {
      startWeight: 63,
      currentWeight: 64,
      targetWeight: 66,
    },
  };

  // 상태
  const [myInfo, setMyInfo] = useState(defaultInfo);

  // 메서드

  // view

  return (
    <div className="section1">
      {/* 내프로필 image box */}
      <MyInfo myInfo={myInfo} />

      {/* 내정보 box */}
      <MyWeight myInfo={myInfo} />

      {/* 내소개 box */}
      <MyIntroduction myInfo={myInfo} />

      {/* TODO : 나의활동 box - github의 잔디모양 */}
      <MyActivity />
    </div>
  );
};

export default Section1;
