
const TdeeCalFunction = (memberInfo, member) => {
  let AMR = 0;
  const calculateAge = () => {
    // 생년월일 문자열을 Date 객체로 변환
    const birthDateObj = new Date(member.birthday);

    // 현재 날짜를 가져오기
    const currentDate = new Date();

    // 나이 계산
    const age = currentDate.getFullYear() - birthDateObj.getFullYear();

    // 생일이 지났는지 확인
    const isBirthdayPassed =
      currentDate.getMonth() > birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() >= birthDateObj.getDate());

    // 생일이 지났다면 나이 그대로, 그렇지 않다면 1을 빼줌
    const finalAge = isBirthdayPassed ? age : age - 1;
    console.log(finalAge);

    return finalAge;
  };
  switch (memberInfo.activityLevel) {
    case "1":
      AMR = 1.2;
      break;
    case "2":
      AMR = 1.375;
      break;
    case "3":
      AMR = 1.55;
      break;
    case "4":
      AMR = 1.725;
      break;
    case "5":
      AMR = 1.9;
      break;
    default:
      console.log("error발생");
  }
  const isEqual = member.gender === "male";
  if (isEqual) {
    return Math.floor(
      (10 * memberInfo.currentWeight +
        6.25 * memberInfo.height -
        5 * calculateAge() +
        5) *
        AMR
    );
  } else {
    return Math.floor(
      (10 * memberInfo.currentWeight +
        6.25 * memberInfo.height -
        5 * calculateAge() -
        161) *
        AMR
    );
  }
};

export default TdeeCalFunction;
