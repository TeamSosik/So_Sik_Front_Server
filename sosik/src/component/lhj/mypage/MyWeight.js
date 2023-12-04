import React from "react";
import CallengeContentBox from "./CallengeContentBox.js";

const MyWeight = ({ myInfo }) => {
  // 필드
  const titleList = [
    "도전중인 챌린지",
    "시작체중",
    "현재체중",
    "목표체중",
    "남은양",
  ];
  const buttonBox = {
    image: {
      alt: "나의소식_기록하기",
      url: "https://media.istockphoto.com/id/906857980/ko/%EB%B2%A1%ED%84%B0/%EC%A2%85%EC%9D%B4-%EB%B9%84%ED%96%89%EA%B8%B0-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%8C%8C%EB%9E%80%EC%83%89-%EC%9B%90%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%B3%B4%EB%82%BC-%EB%A9%94%EC%8B%9C%EC%A7%80-%EC%95%84%EC%9D%B4%EC%BD%98.jpg?s=612x612&w=0&k=20&c=tyU-4p6zgDIrAfVdzZD5QAbCzJ4W6c9tH1seYylaCF4=",
    },
    name: "나의소식 기록하기",
  };

  const remainingWeight =
    Number(myInfo.weight.targetWeight) - Number(myInfo.weight.currentWeight); // 남은양

  console.log(remainingWeight);

  // 상태

  // 메서드

  // view

  return (
    <div className="myWeightBox">
      <CallengeContentBox
        title={titleList[0]}
        info={myInfo.challenge[0].name}
        count={myInfo.challenge[0].count}
      />
      <CallengeContentBox
        title={titleList[1]}
        info={myInfo.weight.startWeight}
      />
      <CallengeContentBox
        title={titleList[2]}
        info={myInfo.weight.currentWeight}
      />
      <CallengeContentBox
        title={titleList[3]}
        info={myInfo.weight.targetWeight}
        remainingWeight={remainingWeight}
      />
      {/* button Box */}
      <div className="buttonBox">
        <div className="imageBox">
          <img alt={buttonBox.image.alt} src={buttonBox.image.url} />
        </div>
        <div className="nameBox">
          <span>{buttonBox.name}</span>
        </div>
      </div>
    </div>
  );
};

export default MyWeight;
