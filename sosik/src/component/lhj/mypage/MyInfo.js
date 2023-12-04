import React from "react";

const MyInfo = ({ myInfo }) => {
  // 변수
  const format = "yyyy년 mm월 가입함";

  // 상태

  // 메서드
  /**
   * 기능 : 원하는 형식으로 날짜 포맷을 만들어줍니다.
   * @param {*} date : 날짜
   * @param {*} format : 원하는 날짜 형식
   * @returns : 원하는 날짜 형식
   */
  const formatDate = (date = new Date().toString(), format) => {
    // String을 date로 변경하기
    date = new Date(date);
    // 날짜 추출하기
    const map = {
      yyyy: date.getFullYear(),
      yy: date.getFullYear().toString().slice(-2),
      mm: date.getMonth() + 1,
      dd: date.getDate(),
    };
    const reg = /mm|dd|yyyy|yy/gi; // 정규표현식
    // 날짜 변경하기
    const test = format.replace(reg, (matched) => {
      // console.log(matched); 확인 ok
      return map[matched];
    });
    return test;
  };

  // view

  const myCreateDate = formatDate(myInfo.createDate, format);

  return (
    <div className="myInfoBox">
      {/* 이미지 box */}
      <div className="imageBox">
        <img alt={myInfo.image.originName} src={myInfo.image.url} />
      </div>
      {/* name box */}
      <div className="nameBox">{myInfo.id}</div>
      {/* createDate box */}
      <div className="createDateBox">
        <div className="createDate">{myCreateDate}</div>
      </div>
      {/* button box */}
      <div className="buttonBox">
        <input type="button" value="바이오 업데이트" />
      </div>
    </div>
  );
};

export default MyInfo;
