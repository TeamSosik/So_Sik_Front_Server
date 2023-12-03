import React from "react";

/**
 * 기능 : 나의 소개글을 보여줍니다.
 * @param {*} param0
 * @returns
 */
const MyIntroduction = ({ myInfo }) => {
  return <div className="myIntroductionBox">{myInfo.introduction}</div>;
};

export default MyIntroduction;
