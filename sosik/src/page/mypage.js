import React from "react";
import Section3 from "../component/mypage_section3/mypage_section3";
import Section1 from "../component/lhj/mypage/Section1";
import MyHeader from "../component/header/MyHeader";
import "../common/css/mypage_section3/myfeed.css";

function Mypage() {
  return (
    <div>
      <MyHeader></MyHeader>
      <Section1></Section1>
      <div className="section3">
        <Section3></Section3>
      </div>
    </div>
  );
}

export default Mypage;
