import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import moment from "moment";
import "./calenderview.css";

function Calendarview(props) {
  const [clickedDate, setClickedDate] = useState(null);

  const handleDayClick = async (value, event) => {
    const formattedDate = moment(value).format("YYYY-MM-DD");
    setClickedDate(clickedDate === formattedDate ? null : formattedDate);
    props.propFunction(formattedDate);
  };

  const [breakfastdot, setbreakfastDot] = useState([]);
  const [lunchdot, setlunchDot] = useState([]);
  const [dinnerdot, setdinnerDot] = useState([]);
  const [snackdot, setsnackDot] = useState([]);
  
  const getData = async (value) => {
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

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

  useEffect(() => {
    handleDayClick(new Date());
  },[]);
  
  useEffect(() => {
    getData();
    
  }, [props.mealList]);

  const mark = breakfastdot;
  const mark2 = lunchdot;
  const mark3 = dinnerdot;
  const mark4 = snackdot;

  return (
    <div className="calendarposition">
      <Calendar
        formatDay={(locale, date) => moment(date).format("D")}
        showNeighboringMonth={false}
        value={clickedDate ? moment(clickedDate).toDate() : new Date()}
        className="mx-auto w-full text-sm border-b"
        onClickDay={(value, event) => {
          handleDayClick(value, event);
        }}
        tileContent={({ date }) => {
          const formattedDate = moment(date).format("YYYY-MM-DD");
          const hasMark = mark.includes(formattedDate);
          const hasMark2 = mark2.includes(formattedDate);
          const hasMark3 = mark3.includes(formattedDate);
          const hasMark4 = mark4.includes(formattedDate);

          return (
            <div>
              <div className="absoluteDiv">
                {hasMark && (
                  <div className="flex justify-center items-center">
                    <div className="dot"></div>
                  </div>
                )}
                {hasMark2 && (
                  <div className="flex justify-center items-center">
                    <div className="dot2"></div>
                  </div>
                )}
                {hasMark3 && (
                  <div className="flex justify-center items-center">
                    <div className="dot3"></div>
                  </div>
                )}
                {hasMark4 && (
                  <div className="flex justify-center items-center">
                    <div className="dot4"></div>
                  </div>
                )}
              </div>
              
            </div>
          );
        }}
      />

      <div className="meals-container">
        <div className="meals">
          <span className="dot_1"></span>
          <span>아침식사</span>
        </div>
        <div className="meals">
          <span className="dot2_1"></span>
          <span>점심식사</span>
        </div>
        <div className="meals">
          <span className="dot3_1"></span>
          <span>저녁식사</span>
        </div>
        <div className="meals">
          <span className="dot4_1"></span>
          <span>간식</span>
        </div>
      </div>
    </div>
  );
}

export default Calendarview;
