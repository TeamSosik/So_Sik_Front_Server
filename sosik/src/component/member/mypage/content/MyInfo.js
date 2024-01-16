import React from 'react';
import "./myinfo.css";
import axios from 'axios';
import {useEffect,useState} from 'react';


const MyInfo = () => {

    const userInfo = JSON.parse(window.localStorage.getItem("member"));
    let currentWeight = userInfo.result.weightList?.[0]?.currentWeight
    let targetWeight = userInfo.result.weightList?.[0]?.targetWeight

    const getData = async () => {
        const authorization = JSON.parse(localStorage.getItem("accesstoken"));
        const refreshToken = JSON.parse(localStorage.getItem("refreshtoken"));

        let today = new Date();
        today = today.toISOString();
        today = today.split("T")[0];

        // console.log(today);
        
        try {
            await axios({
                method: "get",
                url: 'http://localhost:5056/target-calorie/v1/'+today,
                headers: {
                    "authorization":  authorization,
                    "refreshToken":  refreshToken
                }
            })
            .then(response => {
                if(response.data.result.dayTargetKcal !== null){
                    setTodaykcal(response.data.result.dayTargetKcal);
                    return 
                }
                // console.log(response)

            });
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData();          
    }, []);

    const [todaykcal,setTodaykcal] = useState("")
    

  
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
                            <span className="kcal-name">{todaykcal}kcal</span>
                        </div>
                    </div>
                </div>
                <hr />
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
