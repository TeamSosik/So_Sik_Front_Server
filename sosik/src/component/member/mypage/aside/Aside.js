import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./aside.css";
import WeightModal from "../../../intake/modal/WeightModal";
import axios from "axios";
import DefaultImage from "../../../../images/default-image.png";

const Aside = ({ props }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = async (e) => {
    e.preventDefault();
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));
    try {
      const response = await axios.get(
        "http://localhost:5056/members/v1/weight-record-check",
        {
          headers: {
            authorization: authorization,
            refreshtoken: refreshToken,
          },
        }
      );

      if (response.data) {
        window.alert("오늘은 이미 기록하였습니다!");
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    } catch (error) {}
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  console.log(props.profileImage);
  console.log(props.profileImage.indexOf("cat.jpg"));

  return (
    <>
      <div className="left-section">
        <div className="profile-info">
          <img
            src={
              props.profileImage && props.profileImage.indexOf("cat.jpg") !== -1 ? 
              DefaultImage
              :
              `http://localhost:5056/members/v1/images/${props.memberId}`
            }
            alt=""
          />
          <h2>{props.nickname} 님</h2>
        </div>
        <div className="update-btn">
          <button
            className="my-kcal"
            type="submit"
            onClick={() => handleNavigate("/recdkcal")}
          >
            나의 칼로리
            <FontAwesomeIcon
              icon={faAngleRight}
              size="2xs"
              style={{ color: "#000000", marginLeft: 30 }}
            />
          </button>
          <button
            className="my-anly"
            type="submit"
            onClick={() => handleNavigate("/recdanly")}
          >
            나의 분석
            <FontAwesomeIcon
              icon={faAngleRight}
              size="2xs"
              style={{ color: "#000000", marginLeft: 30 }}
            />
          </button>
          <button
            className="myweight-update"
            type="submit"
            onClick={handleShowModal}
          >
            나의 체중 기록
            <FontAwesomeIcon
              icon={faAngleRight}
              size="2xs"
              style={{ color: "#000000", marginLeft: 30 }}
            />
          </button>
          <button
            className="myinfo-update"
            type="submit"
            onClick={() => handleNavigate("/updateinfo")}
          >
            내 정보 수정
            <FontAwesomeIcon
              icon={faAngleRight}
              size="2xs"
              style={{ color: "#000000", marginLeft: 30 }}
            />
          </button>
        </div>
      </div>
      {showModal && (
        <WeightModal handleCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Aside;
