import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

function FindPw() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 이전 상태를 복사하고 현재 필드를 업데이트
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.stringify(formData);
      const response = await axios
        .post("http://localhost:5056/members/v1/passwd", jsonData, {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((result) => {
          alert("가입된 이메일로 비밀번호를 전송하였습니다!");
          navigate("/"); //리다이렉트
        });
    } catch (error) {
      console.error("알수없는 오류가 발생했습니다.:", error);
    }
  };
  return (
    <Container className="logincontainer2">
      <Row>
        <Col></Col>
        <Col xs={3}>
          <h1>비밀번호 찾기</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group as={Col}>
              <Form.Label className="loginfont">이메일</Form.Label>
              <Form.Control
                className="inputdiv"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일 주소"
              />
            </Form.Group>
            <Form.Group className="mb-3" id="formGridCheckbox"></Form.Group>
            <Button variant="success" type="submit" className="loginbutton">
              <strong>전송</strong>
            </Button>
            <br />
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default FindPw;
