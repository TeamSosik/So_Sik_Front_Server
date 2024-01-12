import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./inputkcal.css";
import { Navigate, useNavigate } from "react-router-dom";

function Inputkcalcard() {
  const [todayTargetKcal, setTodayTargetkcal] = useState({
    dayTargetKcal: "",
    dailyIntakePurpose: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodayTargetkcal({ ...todayTargetKcal, [name]: value });
  };

  const navigate = useNavigate();
  const getData2 = async () => {
    const authorization = JSON.parse(localStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshtoken"));

    let today = new Date();
    today = today.toISOString();
    today = today.split("T")[0];

    console.log(today);

    try {
      await axios({
        method: "get",
        url: "http://localhost:5056/target-calorie/v1/" + today,
        headers: {
          authorization: "Bearer " + authorization,
          refreshToken: "Bearer " + refreshToken,
        },
      }).then((response) => {
        console.log(response);
        console.log(response.data.result.dayTargetKcal);
        setTodayTargetkcal(response.data.result);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData2();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const json = JSON.stringify(todayTargetKcal);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("requestTargetCalorier", blob);

    try {
      const response = await axios
        .post("http://localhost:5056/target-caloire/v1/", todayTargetKcal)
        .then((result) => {
          alert("목표칼로리 기입에 성공하였습니다.");
          navigate("/mainpage");
        });
    } catch (error) {}
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
          오늘의 목표칼로리
        </Card.Title>
        <Card.Text>
          <Form onSubmit={handleOnSubmit}>
            <div className="d-flex">
              <span className="purpose">목적:</span>
              <Form.Check
                type="radio"
                name="dailyIntakePurpose"
                value="0"
                className="form-check-lg"
                onChange={handleInputChange}
              />
              <span className="kcalpurpose">체중증량</span>
              <Form.Check
                type="radio"
                name="dailyIntakePurpose"
                value="1"
                className="form-check-lg"
                onChange={handleInputChange}
              />
              <span className="kcalpurpose">체중감량</span>
            </div>
            <div className="d-flex">
              <Form.Control
                type="text"
                name="dayTargetKcal"
                className="kcalform mr-2"
                onChange={handleInputChange}
              />
              <span className="kcal">kcal</span>
            </div>
            {/* <Button variant="success" className="kcalbutton">
            수정
          </Button> */}
            <Button type="submit" variant="success" className="kcalbutton">
              등록
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Inputkcalcard;
