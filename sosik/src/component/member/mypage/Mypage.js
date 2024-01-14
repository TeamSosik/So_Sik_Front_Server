import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WeightModal from "../../intake/modal/WeightModal";
import "./mypage.css";
import Aside from "./aside/Aside";
import MyInfo from "./content/MyInfo";
import Graph from "./content/Graph";

const MyPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const userInfo =JSON.parse(window.localStorage.getItem("member"));  
 
  
  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  
  return (
    <div className="my-page">
      <Aside/>
      <div className="right-section">
        <MyInfo/>
        <Graph />
      </div>
      {showModal && <WeightModal handleCloseModal={() => setShowModal(false)} />}
    </div>
  );
};

export default MyPage;