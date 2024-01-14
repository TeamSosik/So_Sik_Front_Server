import React from 'react';
import "./myinfo.css";

const MyInfo = () => {

    const userInfo =JSON.parse(window.localStorage.getItem("member"));  
    let currentWeight = userInfo.result.weightList?.[0]?.currentWeight
    let targetWeight = userInfo.result.weightList?.[0]?.targetWeight

    return (
        <>               
            <div className="kcal-weight">
            <div className="kcal">
                <div className="kcal-type">
                <div className="tdee-kcal">
                    <span className="kcal-type-name">TDEE 칼로리</span>
                    <span className="kcal-name">{userInfo.result.tdeeCalculation}kcal</span>
                </div>
                <hr />
                <div className="activity-kcal">
                    <span className="kcal-type-name">오늘 목표 칼로리</span>
                    <span className="kcal-name">{userInfo.tdeeCalculation}kcal</span>
                </div>
                </div>
            </div>
            <div className="weight">
                <div className="current-weight">
                <span className="weight-name">현재 체중</span>
                <p className="current">{currentWeight}kg</p>
                </div>
                <div className="target-weight">
                <span className="weight-name">목표 체중</span>
                <p className="target">{targetWeight}kg</p>
                </div>
                <div className="remaining-weight">
                <span className="weight-name">남은 체중</span>
                <p className="remaining">
                    {Math.abs(currentWeight - targetWeight) === 0 ? "목표 달성!" : `${Math.abs(currentWeight - targetWeight)}kg`}
                </p>
                </div>
            </div>
          </div>
        </>
    );
};

export default MyInfo;


