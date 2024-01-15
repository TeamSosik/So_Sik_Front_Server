const ValidationForm = (memberInfo) => {
  const { currentWeight, targetWeight, height, activityLevel } = memberInfo;

  // 각 필드에 대한 유효성 검사
  if (!currentWeight || !targetWeight || !height || !activityLevel) {
    alert("모든 정보를 입력해주세요.");
    return false;
  }

  return true;
};
export default ValidationForm;
