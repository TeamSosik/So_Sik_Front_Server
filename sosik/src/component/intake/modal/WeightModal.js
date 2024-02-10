import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState } from "react";
import RenderTooltip from "./RenderTooltip";
import { OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

function WeightModal({ handleCloseModal, accessToken }) {
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleWeightInput = async (e) => {
    e.preventDefault();
    try {
      const accesstoken = JSON.parse(
        window.sessionStorage.getItem("accesstoken")
      );
      const refreshtoken = JSON.parse(
        window.sessionStorage.getItem("refreshtoken")
      );

      await axios
        .post(
          "http://43.200.224.252:5056/members/v1/weight",
          {
            currentWeight: currentWeight,
            targetWeight: targetWeight,
          },
          {
            headers: {
              authorization: accesstoken,
              refreshtoken: refreshtoken,
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          handleCloseModal();
          window.location.reload();
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="weight-modal">
      <Modal
        show={true}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered // 중앙 정렬
      >
        <Modal.Header closeButton>
          <Modal.Title>
            나의 체중 기록{" "}
            <OverlayTrigger
              placement="right"
              delay={{ show: 100, hide: 300 }}
              overlay={RenderTooltip}
            >
              <FontAwesomeIcon icon={faCircleQuestion} />
            </OverlayTrigger>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label htmlFor="weightInput">현재 체중 입력</label>
            <input
              type="text"
              className="currentweightInput"
              name="currentWeight"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
            />

            <label htmlFor="weightInput">목표 체중 입력</label>
            <input
              type="text"
              className="targetweightInput"
              name="targetWeight"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleWeightInput}>
            기록
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WeightModal;
