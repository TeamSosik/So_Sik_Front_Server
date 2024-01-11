import React from "react";

const ValidationForm = (memberInfo, isDuplicate) => {
  const {
    email,
    password,
    passwordCheck,
    name,
    gender,
    birthday,
    currentWeight,
    targetWeight,
    height,
    activityLevel,
    nickname,
  } = memberInfo;

  // 각 필드에 대한 유효성 검사
  if (
    !email ||
    !password ||
    !passwordCheck ||
    !name ||
    !gender ||
    !birthday ||
    !currentWeight ||
    !targetWeight ||
    !height ||
    !activityLevel ||
    !nickname
  ) {
    alert("모든 정보를 입력해주세요.");
    return false;
  }

  // 이메일 유효성 검사 (간단한 예제)
  const emailRegex =
    /^([\w.-])*[a-zA-Z0-9]+([\w.-])*([a-zA-Z0-9])+([\w.-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  if (!emailRegex.test(email)) {
    alert("올바른 이메일 주소를 입력해주세요.");
    return false;
  }

  // 비밀번호 일치 여부 확인
  if (password !== passwordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }

  if (isDuplicate !== false) {
    alert("아이디 중복확인을 해주세요!");
    return false;
  }

  return true;
};
export default ValidationForm;
