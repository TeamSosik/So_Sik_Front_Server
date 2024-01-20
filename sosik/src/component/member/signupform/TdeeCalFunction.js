const TdeeCalFunction = (props) => {
  const calculateAge = () => {
    // 생년월일 문자열을 Date 객체로 변환
    const birthDateObj = new Date(props.birthday);

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
    return finalAge;
  };

  const setAMR = () => {
    let AMR = 0;
    switch (props.activityLevel) {
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
    return AMR;
  };
  const age = calculateAge();
  const AMR = setAMR();
  const isEqual = props.gender === "male";

  if (isEqual) {
    return Math.floor(
      (10 * props.currentWeight + 6.25 * props.height - 5 * age + 5) * AMR
    );
  } else {
    return Math.floor(
      (10 * props.currentWeight + 6.25 * props.height - 5 * age - 161) * AMR
    );
  }
};

export default TdeeCalFunction;
