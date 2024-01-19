import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Row,
  Col,
  Container,
  InputGroup,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../../updatemyinfo/UpdateInfo.css";
import RenderTooltip from "../../signupform/RenderTooltip";
import TdeeCalFunction from "../../signupform/TdeeCalFunction";

import SelectOptions from "../../signupform/SelectOptions";
import GenerateOptions from "../../signupform/GenerateOptions";

function SnsInfo() {
  const navigate = useNavigate();
  const member = JSON.parse(window.localStorage.getItem("member"));


  const [memberInfo, setMemberInfo] = useState({
    currentWeight: 0,
    targetWeight: 0,
    height: 0,
    activityLevel: "",
    birthday: "",
    gender: "",
    tdeeCalculation: 0,
    profileImage: "", // 사용자가 프로필 이미지를 선택하지 않았을 때를 나타내기 위해서 null로 설정
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMemberInfo((prevInfo) => ({
      ...prevInfo,
      profileImage: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "year" || name === "month" || name === "day") {

      setMemberInfo((prevInfo) => ({
        ...prevInfo,
        birthday: {
          ...prevInfo.birthday,
          year: prevInfo.birthday.year || "",
          month: prevInfo.birthday.month || "",
          day: prevInfo.birthday.day || "",
          [name]: value,
        },
      }));
    } else {
      setMemberInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    }

    const { year, month, day } = memberInfo.birthday;
    if (year && month && day) {
      const formattedDate = `${year}-${month}-${day}`;
      setMemberInfo((prevInfo) => ({
        ...prevInfo,
        birthday: formattedDate,
      }));
    }
  };
  const years = GenerateOptions(2020, 1900);
  const months = GenerateOptions(1, 12);
  const days = GenerateOptions(1, 31);

  const handleSubmit = async (e) => {

    e.preventDefault();
    memberInfo.tdeeCalculation = TdeeCalFunction(memberInfo, member);

    //유효성 검사
    const formData = new FormData();
    
    formData.append("profileImage", memberInfo.profileImage);

    const json = JSON.stringify(memberInfo);
    const blob = new Blob([json], {
      type: "application/json",
    });
    
    formData.append("enrollMemberOauth", blob);
    const headers = {
      "memberId2" : member.memberId,
      "Content-Type": "multipart/form-data",   
    };
    

    try {
      axios.patch('http://localhost:5056/oauth/v1', formData, { headers })
      .then(function (res) {
        window.localStorage.setItem("member",JSON.stringify(res.data));
        alert("정상 등록되었습니다.")
      })
    } catch (error) {
      console.error("가입에 실패하였습니다. 잠시 후 다시 시도해주세요", error); // 오류 처리
    }


    const customHeader = {
      authorization: window.localStorage.getItem("accesstoken"),
      refreshToken: window.localStorage.getItem("refreshtoken"),
      memberId: member.memberId
    };

    axios.get("http://localhost:5056/members/v1/detail", {
      headers: customHeader,
    })
    .then(function (res) {
      window.localStorage.setItem("member",JSON.stringify(res.data));
      navigate("/mainpage"); //리다이렉트
      
    })
    .catch (function(error) {
      console.error("", error); // 오류 처리
    });
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <Form className="updateInfo" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Label column sm="3">
                현재 체중
              </Form.Label>
              <Form.Control
                aria-describedby="basic-addon2"
                name="currentWeight"
                onChange={handleInputChange}
              />
              <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Label column sm="3">
                목표 체중
              </Form.Label>
              <Form.Control
                aria-describedby="basic-addon2"
                name="targetWeight"
                onChange={handleInputChange}
              />
              <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Label column sm="3">
                신장
              </Form.Label>
              <Form.Control
                aria-describedby="basic-addon2"
                name="height"
                onChange={handleInputChange}
              />
              <InputGroup.Text id="basic-addon2">cm</InputGroup.Text>
            </InputGroup>

            <div key={`inline-${"radio"}`} className="mb-3">
              <Form.Label column sm="3">
                성별
              </Form.Label>
              <Form.Check
                inline
                label="남성"
                name="gender"
                type={"radio"}
                id={`inline-${"radio"}-1`}
                value="male"
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="여성"
                name="gender"
                type={"radio"}
                id={`inline-${"radio"}-2`}
                value="female"
                onChange={handleInputChange}
              />
            </div>

            <Row className="mb-3">
              <Form.Label column sm="3">
                생년월일
              </Form.Label>

              <Form.Group as={Col} controlId="formGridYear">
                <SelectOptions
                  defaultValue="연도"
                  values={years}
                  name="year"
                  handleInputChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMonth">
                <SelectOptions
                  defaultValue="월"
                  values={months}
                  name="month"
                  handleInputChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDay">
                <SelectOptions
                  defaultValue="일"
                  values={days}
                  name="day"
                  handleInputChange={handleInputChange}
                />
              </Form.Group>
            </Row>

            <div key={`inline-${"radio"}`} className="mb-3">
              <Form.Label column sm="3">
                활동레벨
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 100, hide: 300 }}
                  overlay={RenderTooltip}
                >
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </OverlayTrigger>
              </Form.Label>

              <Form.Check
                inline
                label="매우 비활동적"
                name="activityLevel"
                type={"radio"}
                id={`inline-${"radio"}-1`}
                value="1"
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="비활동적"
                name="activityLevel"
                type={"radio"}
                id={`inline-${"radio"}-2`}
                value="2"
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="보통"
                name="activityLevel"
                type={"radio"}
                id={`inline-${"radio"}-3`}
                value="3"
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="활동적"
                name="activityLevel"
                type={"radio"}
                id={`inline-${"radio"}-4`}
                value="4"
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="매우 활동적"
                name="activityLevel"
                type={"radio"}
                id={`inline-${"radio"}-5`}
                value="5"
                onChange={handleInputChange}
              />
            </div>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>프로필 이미지</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit">
                가입하기
              </Button>
            </div>
          </Form>
        </Col>
        <Col> </Col>
      </Row>
    </Container>
  );
}

export default SnsInfo;
