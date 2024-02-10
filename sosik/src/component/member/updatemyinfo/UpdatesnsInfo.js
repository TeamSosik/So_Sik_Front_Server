import React, { useState, useEffect } from "react";
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
import "./UpdateInfo.css";
import RenderTooltip from "./RenderTooltip";
import TdeeCalFunction from "./TdeeCalFunction";
import ValidationForm from "./ValidationForm";

function UpdateInfo() {
  const [users, setUsers] = useState({
    memberId: "",
    email: "",
    name: "",
    gender: "",
    height: "",
    role: "",
    activityLevel: "",
    nickname: "",
    profileImage: "",
    birthday: "",
    tdeeCalculation: "",
    weightList: [""],
  });
  const getMemberDetail = async () => {
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

    try {
      await axios({
        method: "get",
        url: "http://43.200.224.252:5056/members/v1/detail",
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setUsers(response.data.result);
        const { weightList, height } = response.data.result;
        const data = response.data.result;
        const { currentWeight, targetWeight } =
          weightList[weightList.length - 1];
        setMemberInfo({
          currentWeight: currentWeight,
          targetWeight: targetWeight,
          height: height,
        });
        // a = {
        //   ...a,
        //   currentWeight:
        //     data.weightList[data.weightList.length - 1].currentWeight,
        //   targetWeight:
        //     data.weightList[data.weightList.length - 1].targetWeight,
        // };

        // setMemberInfo(a);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMemberDetail();
  }, []);
  const navigate = useNavigate();
  const member = JSON.parse(window.sessionStorage.getItem("member")).result;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };
  const [memberInfo, setMemberInfo] = useState({
    currentWeight: "",
    targetWeight: "",
    height: "",
    activityLevel: "",
    gender:"",
    tdeeCalculation: 0,
    profileImage: "", // 사용자가 프로필 이미지를 선택하지 않았을 때를 나타내기 위해서 null로 설정
  });
  console.log(memberInfo);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMemberInfo((prevInfo) => ({
      ...prevInfo,
      profileImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    memberInfo.tdeeCalculation = TdeeCalFunction(memberInfo, member);

    //유효성 검사
    if (!ValidationForm(memberInfo)) {
      return;
    }
    const formData = new FormData();

    formData.append("profileImage", memberInfo.profileImage);

    const json = JSON.stringify(memberInfo);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("updateMember", blob);

    try {
      const accesstoken = JSON.parse(
        window.sessionStorage.getItem("accesstoken")
      );
      const refreshtoken = JSON.parse(
        window.sessionStorage.getItem("refreshtoken")
      );

      await axios({
        method: "patch", // 통신 방식
        headers: {
          authorization: accesstoken,
          refreshToken: refreshtoken,
          "Content-Type": "multipart/form-data",
        },
        url: "/members/v1",
        baseURL: "http://43.200.224.252:5056", // 서버
        data: formData,
      }).then(function (response) {
        navigate("/mypage"); //리다이렉트
      });
    } catch (error) {
      console.error("회원정보수정 실패:", error); // 오류 처리
    }
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
                defaultValue={memberInfo.currentWeight}
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
                defaultValue={memberInfo.targetWeight}
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
                defaultValue={memberInfo.height}
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
