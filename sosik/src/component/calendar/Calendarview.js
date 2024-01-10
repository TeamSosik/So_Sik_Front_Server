import React, { useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';
import './calenderview.css';

function Calendarview() {
  const mark = ["2024-01-02", "2024-01-03", "2024-01-10"];
  const mark2 = ["2024-01-02", "2024-01-04", "2024-01-11", "2024-01-22"];
  const mark3 = ["2024-01-02", "2024-01-04", "2024-01-11", "2024-01-13"];

  const [clickedDate, setClickedDate] = useState(null);
  const [dayTargetKcal, setDayTargetKcal] = useState(null);

  const handleDayClick = async (value, event) => {
    const formattedDate = moment(value).format("YYYY-MM-DD");
    setClickedDate(clickedDate === formattedDate ? null : formattedDate);

    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5056/target-calorie/getcalorie",
        data: formattedDate
      })
      setDayTargetKcal(response.data.dayTargetKcal);
    } catch (error) {
      console.error("기록된 데이터가 없습니다.", error);
      setDayTargetKcal(null);
    }

    event.preventDefault();
  };

  return (
    <div>
      <Calendar
        formatDay={(locale, date) => moment(date).format("DD")}
        showNeighboringMonth={false}
        value={clickedDate ? moment(clickedDate).toDate() : new Date()}
        className="mx-auto w-full text-sm border-b"
        onClickDay={(value, event) => handleDayClick(value, event)}
        tileContent={({ date }) => {
          const formattedDate = moment(date).format("YYYY-MM-DD");
          const hasMark = mark.includes(formattedDate);
          const hasMark2 = mark2.includes(formattedDate);
          const hasMark3 = mark3.includes(formattedDate);

          return (
            <div className="absoluteDiv">
              {hasMark && <div className="flex justify-center items-center"><div className="dot"></div></div>}
              {hasMark2 && <div className="flex justify-center items-center"><div className="dot2"></div></div>}
              {hasMark3 && <div className="flex justify-center items-center"><div className="dot3"></div></div>}
              {clickedDate === formattedDate && <div>2000</div>}
            </div>
          );
        }}
      />
    </div>
  );
}

export default Calendarview;
