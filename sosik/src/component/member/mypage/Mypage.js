import React from "react";
import "./mypage.css";
import Aside from "./aside/Aside";
import MyInfo from "./content/MyInfo";
import Graph from "./content/Graph";

const MyPage = () => {

  return (
    <div className="my-page">
      <Aside />
      <div className="right-section">
        <MyInfo />
        <Graph />
      </div>
    </div>
  );
};

export default MyPage;