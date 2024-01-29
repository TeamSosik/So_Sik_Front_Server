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
import RenderTooltip from "./RenderTooltip";
import GenerateOptions from "./GenerateOptions";
import SelectOptions from "./SelectOptions";
import ValidationForm from "./ValidationForm";
import TdeeCalFunction from "./TdeeCalFunction";

function Signup() {
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [passwordLength, setPasswordLength] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(null);

  const [memberInfo, setMemberInfo] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    birthday: "",
    height: 0,
    activityLevel: "1",
    nickname: "",
    currentWeight: 0,
    targetWeight: 0,
    tdeeCalculation: 0,
    profileImage: "", // 사용자가 프로필 이미지를 선택하지 않았을 때를 나타내기 위해서 null로 설정
  });

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setMemberInfo((prevInfo) => ({ ...prevInfo, password: value }));
    checkPasswordMatch(value, memberInfo.passwordCheck);
  };

  const handlePasswordCheckChange = (e) => {
    const { value } = e.target;
    setMemberInfo((prevInfo) => ({ ...prevInfo, passwordCheck: value }));
    checkPasswordMatch(memberInfo.password, value);
  };
  const checkPasswordLength = (password) => {
    if (password.length < 8 || password.length > 16) {
      setPasswordLength(false);
    } else {
      setPasswordLength(true);
    }
  };
  const checkPasswordMatch = (password, passwordCheck) => {
    if (password && passwordCheck) {
      if (password === passwordCheck) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    } else {
      setPasswordMatch(null);
    }
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
    } else if (name === "password") {
      setMemberInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
      handlePasswordChange(e);
      checkPasswordLength(e.target.value);
    } else if (name === "passwordCheck") {
      handlePasswordCheckChange(e);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMemberInfo((prevInfo) => ({
      ...prevInfo,
      profileImage: file,
    }));
  };
  const handleCheckDuplicated = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:5056/members/v1/validation/" + memberInfo.email
      );
      if (response.data) {
        setIsDuplicate(true);
      } else {
        setIsDuplicate(false);
      }
    } catch (error) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // memberInfo
    memberInfo.tdeeCalculation = TdeeCalFunction(memberInfo);
    //유효성 검사
    if (!ValidationForm(memberInfo, isDuplicate)) {
      return;
    }

    const formData = new FormData();

    formData.append("profileImage", memberInfo.profileImage);

    const json = JSON.stringify(memberInfo);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("member", blob);

    try {
      const response = await axios({
        method: "post", // 통신 방식
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: "http://localhost:5056/members/v1/sign-up", // 서버
        data: formData,
      }).then(function (response) {
        alert("가입을 환영합니다!");
        navigate("/mainpage"); //리다이렉트
      });
    } catch (error) {
      console.error("회원가입 실패:", error); // 오류 처리
    }
  };

  const years = GenerateOptions(2020, 1900);
  const months = GenerateOptions(1, 12);
  const days = GenerateOptions(1, 31);

  return (
    <Container style={{ marginTop: "150px", marginBottom: "100px" }}>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Label column sm="3">
                이메일
              </Form.Label>

              <Form.Control
                // placeholder="example@sosik.com"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="email"
                onChange={handleInputChange}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleCheckDuplicated}
              >
                중복확인
              </Button>
            </InputGroup>
            <InputGroup className="mb-3" style={{ marginLeft: "185px" }}>
              {isDuplicate !== null && (
                <p style={{ color: isDuplicate ? "red" : "blue" }}>
                  {isDuplicate
                    ? "이 아이디는 사용중인 아이디입니다."
                    : "이 아이디는 사용가능한 아이디 입니다."}
                </p>
              )}
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Label column sm="3">
                비밀번호
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3" style={{ marginLeft: "185px" }}>
              {passwordLength !== null && (
                <div
                  id="same"
                  style={{ color: passwordLength ? "blue" : "red" }}
                >
                  {passwordLength
                    ? ""
                    : "비밀번호는 8자리이상 16자리이하 입니다."}
                </div>
              )}
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Label column sm="3">
                비밀번호 확인
              </Form.Label>
              <Form.Control
                type="password"
                name="passwordCheck"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3" style={{ marginLeft: "185px" }}>
              {passwordMatch !== null && (
                <div
                  id="same"
                  style={{ color: passwordMatch ? "blue" : "red" }}
                >
                  {passwordMatch
                    ? "비밀번호가 일치합니다."
                    : "비밀번호가 일치하지 않습니다."}
                </div>
              )}
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Label column sm="3">
                이름
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleInputChange}
              />
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
                활동 레벨
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
            </InputGroup>

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
export default Signup;
