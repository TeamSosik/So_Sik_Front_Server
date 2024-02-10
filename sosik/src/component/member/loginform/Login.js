import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { HeaderContext } from "../../common/header/Header";

function Login() {

  const REST_API_KEY_FOR_KAKAO = "83838cea18a7862894ce003e923d2fd7";
  const REDIRECT_URI_FOR_KAKAO = "http://43.200.224.252:3000/redirection";
  const linkForKakao = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY_FOR_KAKAO}&redirect_uri=${REDIRECT_URI_FOR_KAKAO}&response_type=code`;

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();

  const [error, setError] = useState("");
  const [isMemoryEmailCheck, setIsMemoryEmailCheck] = useState(() => {

    return window.localStorage.getItem("email") ? true : false;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const loginHandlerForKakao = () => {
    window.location.href = linkForKakao;
  };
  const navigate = useNavigate();
  const { setlogout } = useContext(HeaderContext); // heaer context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post("http://43.200.224.252:5056/members/v1/sign-in", credentials)
        .then((result) => {
          const accesstoken = result.data.result.accessToken;
          const refreshtoken = result.data.result.refreshToken;
          const member = result.data;

          window.sessionStorage.setItem("accesstoken", JSON.stringify(accesstoken));
          window.sessionStorage.setItem("refreshtoken", JSON.stringify(refreshtoken));
          window.sessionStorage.setItem("member", JSON.stringify(member));
          // 이메일 저장하기
          saveMemoryEmail();

          alert(`환영합니다. ${member.result.member.nickname}님`);

          const customHeader = {
            authorization: window.sessionStorage.getItem("accesstoken"),
            refreshToken: window.sessionStorage.getItem("refreshtoken"),
            memberId: member.memberId,
          };

          axios
            .get("http://43.200.224.252:5056/members/v1/detail", {
              headers: customHeader,
            })
            .then(function (res) {
              window.sessionStorage.setItem("member", JSON.stringify(res.data));
              
              // 위치 이동
              if(location.state) {
                const {pathname} = location.state.data;
                console.log("hihihi");
                console.log(pathname);
                navigate(pathname);
                return;
              }

              navigate("/"); //리다이렉트
            })
            .catch(function (error) {
              console.error("", error); // 오류 처리
            });
          
          setlogout(false);
        });
    } catch (error) {
      console.error("로그인 실패:", error);
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const saveMemoryEmail = () => {
    if (isMemoryEmailCheck) {
      window.localStorage.setItem("email", credentials.email);
    } else {
      window.localStorage.removeItem("email");
    }
  }

  // 기억아이디 불러오기
  const getMemoryEmail = () => {

    const email = window.localStorage.getItem("email");
    if (email) {
      setCredentials((current) => {
        const newCurrent = {
          ...current,
          email: email
        }
        return newCurrent;
      });
    }
  }

  const handleMemoryEmailCheckBoxClick = () => {
    if (!isMemoryEmailCheck) {
      setIsMemoryEmailCheck(true);
      return;
    }
    setIsMemoryEmailCheck(false);
  }

  useEffect(() => {

    getMemoryEmail();
  }, []);

  return (
    <Container className="logincontainer">
      <Row>
        <Col></Col>
        <Col xs={4} className="logincontainer">
          <Form onSubmit={handleLogin}>
            <Form.Group as={Col}>
              <Form.Control
                className="email"
                type="text"
                name="email"
                value={credentials.email}
                placeholder="이메일 주소"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                className="password"
                type="password"
                name="password"
                value={credentials.password}
                placeholder="비밀번호"
                onChange={handleInputChange}
              />
              {error && <p className="error-message">{error}</p>}
            </Form.Group>
            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                className="loginfont"
                onClick={handleMemoryEmailCheckBoxClick}
                defaultChecked={isMemoryEmailCheck}
                label="이메일 기억하기"
              />
            </Form.Group>
            <Button variant="success" type="submit" className="loginbutton">
              <strong>로그인</strong>
            </Button>
            <p className="loginfont2">
              <Link to="/signup">회원가입</Link> |{" "}
              <Link to="/findPw">비밀번호찾기</Link>
            </p>
            <h2 class="hr-block__title">소셜미디어 계정으로 로그인</h2>
            {/* <hr></hr> */}
            <div className="logindiv1">
              <a className="btn btn--kakao-talk" onClick={loginHandlerForKakao}>
                카카오 계정으로 로그인
              </a>
            </div>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default Login;
