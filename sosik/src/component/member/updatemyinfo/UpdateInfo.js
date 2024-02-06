import React, { useState, useEffect, useRef } from "react";
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

  const fileRef = useRef();
  const formFileImageBoxRef = useRef();
  const fileLabel = useRef();
  const formFileBoxRef = useRef();

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
        url: "http://localhost:5056/members/v1/detail",
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
    formFileImageBoxRef.current.classList.toggle('view-show');
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
    tdeeCalculation: 0,
    profileImage: "", // 사용자가 프로필 이미지를 선택하지 않았을 때를 나타내기 위해서 null로 설정
  });

  const allowedFileTypes = ["image/jpg","image/jpeg", "image/png", "image/gif"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && allowedFileTypes.includes(file.type)) {

      // 이미지 확인
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        fileRef.current.src = e.target.result;
      }
      fileReader.readAsDataURL(file);
      
      setMemberInfo((prevInfo) => ({
        ...prevInfo,
        profileImage: file,
      }));
      formFileImageBoxRef.current.classList.remove("view-show");
      fileLabel.current.classList.add("view-show");
      formFileBoxRef.current.classList.add("form-file-box");

    } else {

      const fileTypes = allowedFileTypes.map((fileType) => {
        const a = fileType.split("/")[1];
        return a;
      });
      const textFileTypes = fileTypes.join(", ");

      alert(`${textFileTypes} 파일만 사용 가능합니다.`);
      e.target.value = null;
      setMemberInfo((prevInfo) => ({
        ...prevInfo,
        profileImage: "",
      }));

      formFileImageBoxRef.current.classList.toggle("view-show");
      fileLabel.current.classList.toggle("view-show");
      formFileBoxRef.current.classList.toggle("form-file-box");
    }
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
        baseURL: "http://localhost:5056", // 서버
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
            <InputGroup className="mb-3" style={{ marginLeft: "185px" }}>       
              <div
                style={{ color: "red", paddingTop: "5px"}}
              >
                {isNaN(memberInfo.currentWeight) ? "숫자를 입력해주세요" : ""}
              </div>
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
            <InputGroup className="mb-3" style={{ marginLeft: "185px" }}>       
              <div
                style={{ color: "red", paddingTop: "5px"}}
              >
                {isNaN(memberInfo.targetWeight) ? "숫자를 입력해주세요" : ""}
              </div>
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
            <InputGroup className="mb-3" style={{ marginLeft: "185px" }}>       
              <div
                style={{ color: "red", paddingTop: "5px"}}
              >
                {isNaN(memberInfo.height) ? "숫자를 입력해주세요" : ""}
              </div>
            </InputGroup>

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

            <Form.Group controlId="formFile" className="mb-3 file-box">

              <div ref={formFileImageBoxRef} className="form-file-image-box">
                <img ref={fileRef} />
              </div>

              <div ref={formFileBoxRef}>
                <Form.Label ref={fileLabel}>프로필 이미지</Form.Label>
                <Form.Control type="file" accept="image/jpg, image/png, image/jpeg, image/gif" onChange={handleImageChange} />
              </div>

            </Form.Group>

            <Form.Group >
              <div className="text-center submit-box">
                <Button variant="success" type="submit">
                  수정하기
                </Button>
              </div>
            </Form.Group>

          </Form>
        </Col>
        <Col> </Col>
      </Row>
    </Container>
  );
}

export default UpdateInfo;
