import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import moment from "moment";
import "./calenderview.css";

function Calendarview(props) {
  const [clickedDate, setClickedDate] = useState(null);
  const [totalIntakeValues, setTotalIntakeValues] = useState([0, 0, 0, 0]);
  

  const handleDayClick = async (value, event) => {
    const formattedDate = moment(value).format("YYYY-MM-DD");
    setClickedDate(clickedDate === formattedDate ? null : formattedDate);
    props.propFunction(clickedDate);
    const response = await getData2(formattedDate);
    addPieChartData(formattedDate);

    console.log(response);
    // event.preventDefault();
  };

  const [breakfastdot, setbreakfastDot] = useState([]);
  const [lunchdot, setlunchDot] = useState([]);
  const [dinnerdot, setdinnerDot] = useState([]);
  const [snackdot, setsnackDot] = useState([]);
  
  const getData = async (value) => {
    const authorization = JSON.parse(localStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshtoken"));

    try {
      const response = await axios({
        method: "get",
        url: 'http://localhost:5056/intake/v1/check',
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
        },
      }).then((response) => {
        const intakeList = response.data.result;
        const breakfastData = intakeList
          .filter((item) => item.category === "BREAKFAST")
          .map((item) => item.createdAt);
        const lunchData = intakeList
          .filter((item) => item.category === "LUNCH")
          .map((item) => item.createdAt);
        const dinnerData = intakeList
          .filter((item) => item.category === "DINNER")
          .map((item) => item.createdAt);
        const snackData = intakeList
          .filter(item => item.category === 'SNACKS')
          .map(item => item.createdAt);

        setbreakfastDot(breakfastData);
        setlunchDot(lunchData);
        setdinnerDot(dinnerData);
        setsnackDot(snackData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 하루 총 칼로리가져오기
  const getData2 = async (today) => {
    try {
      const accesstoken = JSON.parse(localStorage.getItem("accesstoken"));
      const refreshtoken = JSON.parse(localStorage.getItem("refreshtoken"));

      const url = `/intake/v1/${today}`;

      const response = await axios({

        method: "get",
        url: url,
        baseURL: "http://localhost:5056",
        headers: {
          Authorization: accesstoken,
          refreshtoken: refreshtoken,
          "Content-Type": "application/json"
        },

      });

      return response;

    } catch(e) {

      console.log(e);
    }
    
  }


  const addPieChartData = async (formattedDate) => {
    const data = await getData2(formattedDate);
    console.log(data);
    
    const nutrientDataList = data.data.result;
    console.log(nutrientDataList);
    const updatedValues = [0, 0, 0, 0];
    nutrientDataList.forEach((data) => {
      updatedValues[0] += data.calculationCarbo;
      updatedValues[1] += data.calculationProtein;
      updatedValues[2] += data.calculationFat;
      updatedValues[3] += data.calculationKcal;
    });
  
    setTotalIntakeValues(updatedValues);
  }

  useEffect(() => {    
      getData();
      getData2();
      handleDayClick(new Date());
  }, []);

  const mark = breakfastdot;
  const mark2 = lunchdot;
  const mark3 = dinnerdot;
  const mark4 = snackdot;
 
  return (
    <div>
      <Calendar
        formatDay={(locale, date) => moment(date).format("DD")}
        showNeighboringMonth={false}
        value={clickedDate ? moment(clickedDate).toDate() : new Date()}
        className="mx-auto w-full text-sm border-b"
        onClickDay={(value, event) => {
          console.log("클릭");
          handleDayClick(value, event);
        }}
        tileContent={({ date }) => {
          const formattedDate = moment(date).format("YYYY-MM-DD");
          const hasMark = mark.includes(formattedDate);
          const hasMark2 = mark2.includes(formattedDate);
          const hasMark3 = mark3.includes(formattedDate);
          const hasMark4 = mark4.includes(formattedDate);

          return (
            <div >
              <div className="absoluteDiv">
              {hasMark && <div className="flex justify-center items-center"><div className="dot"></div></div>}
              {hasMark2 && <div className="flex justify-center items-center"><div className="dot2"></div></div>}
              {hasMark3 && <div className="flex justify-center items-center"><div className="dot3"></div></div>}
              {hasMark4 && <div className="flex justify-center items-center"><div className="dot4"></div></div>}
              </div>
              {clickedDate === formattedDate && totalIntakeValues[3] !== 0 && (
                  <div>{totalIntakeValues[3]}kcal</div>
                )}
            </div>
          );
        }}
      />
      {clickedDate ? (
        <div className="text-gray-500 mt-4 text-center">
          {moment(clickedDate).format('YYYY-MM-DD')}
        </div>
      ) : (
        <div className="text-gray-500 mt-4 text-center">
          {moment(new Date()).format('YYYY-MM-DD')}
        </div>
      )}
    </div>
  );
}

export default Calendarview;
