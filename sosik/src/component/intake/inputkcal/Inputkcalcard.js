import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger } from "react-bootstrap";
import RenderTooltip from "./RenderTooltip";

function Inputkcalcard({ props }) {
  const [clickedTargetKcal, setClickedTargetKcal] = useState({
    dayTargetKcal: 0,
  });
  const [managementData, setManagementData] = useState({
    tdeeCalculation: 0,
    currentWeight: 0,
    managementWeek: 0,
    targetWeight: 0,
  });

  const [createTodayTargetKcal, setCreateTodayKcal] = useState({
    dayTargetKcal: 0,
  });
  const [updateTodayTargetKcal, setUpdateTodayTargetKcal] = useState({
    dayTargetKcal: 0,
    createdAt: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateTodayKcal({ ...createTodayTargetKcal, [name]: value });
    setUpdateTodayTargetKcal({ ...updateTodayTargetKcal, [name]: value });
  };

  const getClickedTargetCalorie = async (props) => {
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));
    const loadDate = props.props;

    try {
      await axios({
        method: "get",
        url: "http://43.200.224.252:5056/target-calorie/v1/" + loadDate,
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setClickedTargetKcal(response.data.result);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getManagementData = async () => {
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

    try {
      await axios({
        method: "get",
        url: "http://43.200.224.252:5056/members/v1/target-weight-data",
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setManagementData(response.data.result);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getClickedTargetCalorie(props);
    getManagementData();
  }, [props]);

  const handleOnModify = async (e) => {
    let today = new Date();
    today = today.toISOString();
    today = today.split("T")[0];
    updateTodayTargetKcal.createdAt = today;

    try {
      const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
      const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

      const requestUpdateTargetCalorie = updateTodayTargetKcal;
      await axios
        .patch(
          "http://43.200.224.252:5056/target-calorie/v1/",
          requestUpdateTargetCalorie,
          {
            headers: {
              authorization: authorization,
              refreshToken: refreshToken,
            },
          }
        )
        .then((result) => {
          alert("목표칼로리 수정에 성공하셨습니다.");
          window.location.reload();
        });
    } catch (error) {}
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (clickedTargetKcal === null) {
      try {
        const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
        const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));
        const requestTargetCalorie = createTodayTargetKcal;
        await axios
          .post(
            "http://43.200.224.252:5056/target-calorie/v1/",
            requestTargetCalorie,
            {
              headers: {
                authorization: authorization,
                refreshToken: refreshToken,
              },
            }
          )
          .then((result) => {
            alert("목표칼로리 기입에 성공하였습니다.");
            window.location.reload();
          });
      } catch (error) {}
    } else {
      handleOnModify();
    }
  };

  return (
    <Card
      bg={"white".toLowerCase()}
      key={"white"}
      text={"white".toLowerCase() === "dark"}
      className="inputkcalcard mb-2"
    >
      <Card.Body>
        <Card.Title className="inputkcalcardtitle mb-2">
          오늘의 목표칼로리{" "}
          <OverlayTrigger
            placement="right"
            delay={{ show: 100, hide: 300 }}
            overlay={RenderTooltip(managementData)}
          >
            <FontAwesomeIcon icon={faCircleQuestion} />
          </OverlayTrigger>
        </Card.Title>

        <Card.Text>
          <Form onSubmit={handleOnSubmit}>
            <div className="d-flex">
              <Form.Control
                type="text"
                name="dayTargetKcal"
                className="kcalform mr-2"
                onChange={handleInputChange}
                placeholder={
                  clickedTargetKcal == null
                    ? 0
                    : clickedTargetKcal.dayTargetKcal
                }
              />
              <span className="kcal">kcal</span>
            </div>
            {props.props === new Date().toISOString().split("T")[0] ? (
              clickedTargetKcal === null ? (
                <Button type="submit" variant="success" className="kcalbutton">
                  등록
                </Button>
              ) : (
                <Button type="submit" variant="success" className="kcalbutton">
                  수정
                </Button>
              )
            ) : (
              <div className="blank"></div>
            )}
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Inputkcalcard;
