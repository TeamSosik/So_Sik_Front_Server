import React, { useEffect, useState } from "react";
import axios from "axios";

const RecdKcalSection3_nutrient = ({ props }) => {
  // 필드
  const nutrientDetails = ["탄수화물", "단백질", "지방", "일일목표kcal"];
  const [nutrientRatio, setNutrientRatio] = useState({
    carbohydrate: 0, //탄수화물
    protein: 0, //단백질
    province: 0, //지방
    dayTargetKcal: 0, //일일목표칼로리
  });

  const getClickedTargetCalorie = async (props) => {
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));
    try {
      await axios({
        method: "get",
        url: "http://localhost:5056/target-calorie/v1/" + props,
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.data.result == null) {
          setNutrientRatio((nutrientRatio) => ({
            ...nutrientRatio,
            carbohydrate: 0,
            protein: 0,
            province: 0,
            dayTargetKcal: 0,
          }));
        } else {
          setNutrientRatio((nutrientRatio) => ({
            ...nutrientRatio,
            carbohydrate:
              Math.floor((response.data.result.dayTargetKcal / 8) * 100) / 100,
            protein:
              Math.floor(
                ((response.data.result.dayTargetKcal * 3) / 40) * 100
              ) / 100,
            province:
              Math.floor((response.data.result.dayTargetKcal / 45) * 100) / 100,
            dayTargetKcal: response.data.result.dayTargetKcal,
          }));
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getClickedTargetCalorie(props);
  }, [props]);

  // 상태

  // 메서드

  // view
  const totalIntakeTitleView = "권장 영양 섭취 비율";

  const totalIntakeView = nutrientDetails.map((data, index) => {
    return (
      <div key={index} className="recommended-intake">
        <p className="recommended-intake-name1">{data}</p>
        <p className="recommended-intake-name2">{nutrientRatio[index]}</p>
      </div>
    );
  });

  return (
    <div>
      <div className="recd-kcal-section3">
        <div className="recommended-intake-title">{totalIntakeTitleView}</div>

        <div className="recommended-intake-content">
          <div className="recommended-intake">
            <p className="recommended-intake-name1">{nutrientDetails[0]}</p>
            <p className="recommended-intake-name2">{nutrientRatio.carbohydrate}</p>
          </div>
          <div className="recommended-intake">
            <p className="recommended-intake-name1">{nutrientDetails[1]}</p>
            <p className="recommended-intake-name2">{nutrientRatio.protein}</p>
          </div>
          <div className="recommended-intake">
            <p className="recommended-intake-name1">{nutrientDetails[2]}</p>
            <p className="recommended-intake-name2">{nutrientRatio.province}</p>
          </div>
          <div className="recommended-intake">
            <p className="recommended-intake-name1">{nutrientDetails[3]}</p>
            <p className="recommended-intake-name2">{nutrientRatio.dayTargetKcal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecdKcalSection3_nutrient;
