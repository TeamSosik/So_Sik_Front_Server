import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import "./aside.css";
import WeightModal from "../../../intake/modal/WeightModal";

const Aside = () => {

  const userInfo = JSON.parse(window.localStorage.getItem("member"));

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="left-section">
        <div className="profile-info">
          <img src={`http://localhost:5056/members/v1/images/${userInfo.result.memberId}`} alt="" />
          <h2>{userInfo.result.nickname} 님</h2>
        </div>
        <div className="update-btn">
          <button className="my-kcal" type="submit" onClick={() => handleNavigate('/recdkcal')}>나의 칼로리<FontAwesomeIcon icon={faAngleRight} size="2xs" style={{ color: "#000000", marginLeft: 30 }} /></button>
          <button className="my-anly" type="submit" onClick={() => handleNavigate('/recdanly')}>나의 분석<FontAwesomeIcon icon={faAngleRight} size="2xs" style={{ color: "#000000", marginLeft: 30 }} /></button>
          <button className="myweight-update" type="submit" onClick={handleShowModal}>
            나의 체중 수정<FontAwesomeIcon icon={faAngleRight} size="2xs" style={{ color: "#000000", marginLeft: 30 }} />
          </button>
          <button className="myinfo-update" type="submit" onClick={() => handleNavigate('/updateinfo')}>내 정보 수정<FontAwesomeIcon icon={faAngleRight} size="2xs" style={{ color: "#000000", marginLeft: 30 }} /></button>
        </div>
      </div>
      {showModal && <WeightModal handleCloseModal={() => setShowModal(false)} />}
    </>
  );
};

export default Aside;


