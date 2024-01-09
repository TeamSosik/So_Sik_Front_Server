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
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./UpdateInfo.css";

function UpdateInfo() {
  const navigate = useNavigate();
  const member = JSON.parse(window.localStorage.getItem("member"));

  const handleInputChange = (e) => {
    console.log("input change ***");
    const { name, value } = e.target;
    setMemberInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const [memberInfo, setMemberInfo] = useState({
    currentWeight: 0,
    targetWeight: 0,
    height: 0,
    activityLevel: "",
    nickname: "",
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
  const calculateAge = () => {
    // 생년월일 문자열을 Date 객체로 변환
    const birthDateObj = new Date(member.birthday);

    // 현재 날짜를 가져오기
    const currentDate = new Date();

    // 나이 계산
    const age = currentDate.getFullYear() - birthDateObj.getFullYear();

    // 생일이 지났는지 확인
    const isBirthdayPassed =
      currentDate.getMonth() > birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() >= birthDateObj.getDate());

    // 생일이 지났다면 나이 그대로, 그렇지 않다면 1을 빼줌
    const finalAge = isBirthdayPassed ? age : age - 1;
    console.log(finalAge);

    return finalAge;
  };
  const handletdeeChange = () => {
    let AMR = 0;
    switch (memberInfo.activityLevel) {
      case "1":
        AMR = 1.2;
        break;
      case "2":
        AMR = 1.375;
        break;
      case "3":
        AMR = 1.55;
        break;
      case "4":
        AMR = 1.725;
        break;
      case "5":
        AMR = 1.9;
        break;
      default:
        console.log("error발생");
    }
    console.log(member.gender);
    if (member.gender === "male") {
      setMemberInfo((prevInfo) => {
        const a = {
          ...prevInfo,
          tdeeCalculation:
            (10 * memberInfo.currentWeight +
              6.25 * memberInfo.height -
              5 * calculateAge() +
              5) *
            AMR,
        };

        console.log(a);
        return a;
      });
    } else {
      setMemberInfo((prevInfo) => {

        return {
          ...prevInfo,
          tdeeCalculation:
            (10 * memberInfo.currentWeight +
              6.25 * memberInfo.height -
              5 * calculateAge() -
              161) *
            AMR
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handletdeeChange();
    const formData = new FormData();

    formData.append("profileImage", memberInfo.profileImage);

    const json = JSON.stringify(memberInfo);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("updateMember", blob);

    try {
      const accesstoken = JSON.parse(
        window.localStorage.getItem("accesstoken")
      );
      const refreshtoken = JSON.parse(
        window.localStorage.getItem("refreshtoken")
      );

      console.log(memberInfo);

      const response = await axios({
        method: "patch", // 통신 방식
        headers: {
          authorization: "Bearer " + accesstoken,
          refreshToken: "Bearer " + refreshtoken,
          "Content-Type": "multipart/form-data",
        },
        url: "/members/update",
        baseURL: "http://localhost:5056", // 서버
        data: formData,
      }).then(function (response) {
        navigate("/mainpage"); //리다이렉트
      });
    } catch (error) {
      console.error("회원정보수정 실패:", error); // 오류 처리
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <strong>비활동적</strong> - 대부분의 시간을 앉아서 보내고 규칙적인 운동을
      하지 않는 사람
      <br />
      <br />
      <strong>저활동적</strong> - 대부분의 시간을 앉아서 보내지만 쇼핑, 청소와
      같은 가벼운 운동을 규칙적으로 하는 사람
      <br />
      <br />
      <strong>보통 활동적</strong> - 대부분의 시간을 앉아서 보내지만 운동을
      시간을 정해 보통의 신체적활동을 하는 사람
      <br />
      <br />
      <strong>활동적</strong> - 일상적으로 꾸준한 운동이나 활동을 통해 신체적
      활동량을 유지하는 사람
      <br />
      <br />
      <strong>매우 활동적</strong> - 매일 정기적으로 고강도 운동이나 체력 단련을
      통해 신체 활동량을 높이는 사람
      <br />
      <br />
    </Tooltip>
  );

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
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
                활동레벨
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 100, hide: 300 }}
                  overlay={renderTooltip}
                >
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </OverlayTrigger>
              </Form.Label>

              <Form.Check
                inline
                label="비활동적"
                name="activityLevel"
                type={"radio"}
                id={`inline-${"radio"}-1`}
                value="1"
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="저활동적"
                name="activityLevel"
                type={"radio"}
                id={`inline-${"radio"}-2`}
                value="2"
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="보통 활동적"
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

            <InputGroup className="mb-3">
              <Form.Label column sm="3">
                닉네임
              </Form.Label>

              <Form.Control
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="nickname"
                onChange={handleInputChange}
              />
              <Button variant="outline-secondary" id="button-addon2">
                중복확인
              </Button>
            </InputGroup>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>프로필 이미지</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit">
                수정하기
              </Button>
            </div>
          </Form>
        </Col>
        <Col> </Col>
      </Row>
    </Container>
  );
}

export default UpdateInfo;
