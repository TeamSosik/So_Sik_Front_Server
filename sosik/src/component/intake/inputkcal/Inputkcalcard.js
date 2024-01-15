import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./inputkcal.css";
import { useNavigate } from "react-router-dom";

function Inputkcalcard() {
  const [todayTargetKcal, setTodayTargetkcal] = useState({
    dayTargetKcal: 0,
    dailyIntakePurpose: 0,
  });
  const [createTodayTargetKcal, setCreateTodayKcal] = useState({
    dayTargetKcal: 0,
    dailyIntakePurpose: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateTodayKcal({ ...createTodayTargetKcal, [name]: value });
    console.log(value);
  };

  const navigate = useNavigate();

  const getTodayTargetCalorie = async () => {
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
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log(response);
        console.log(response.data.result);
        setTodayTargetkcal(response.data.result);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTodayTargetCalorie();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const authorization = JSON.parse(localStorage.getItem("accesstoken"));
      const refreshToken = JSON.parse(localStorage.getItem("refreshtoken"));
      console.log(createTodayTargetKcal);
      const requestTargetCalorie = createTodayTargetKcal;
      console.log(requestTargetCalorie);
      await axios
        .post(
          "http://localhost:5056/target-calorie/v1/",
          requestTargetCalorie,
          {
            headers: {
              authorization: "Bearer " + authorization,
              refreshToken: "Bearer " + refreshToken,
            },
          }
        )
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
                value="1"
                className="form-check-lg"
                onChange={handleInputChange}
              />
              <span className="kcalpurpose">체중증량</span>
              <Form.Check
                type="radio"
                name="dailyIntakePurpose"
                value="2"
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
                placeholder={
                  todayTargetKcal == null ? 0 : todayTargetKcal.dayTargetKcal
                }
              />
              <span className="kcal">
                {/* {todayTargetKcal == null ? 0 : todayTargetKcal}kcal */}kcal
              </span>
            </div>
            {todayTargetKcal == null ? (
              <Button type="submit" variant="success" className="kcalbutton">
                등록
              </Button>
            ) : (
              <Button type="submit" variant="success" className="kcalbutton">
                수정
              </Button>
            )}
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Inputkcalcard;
