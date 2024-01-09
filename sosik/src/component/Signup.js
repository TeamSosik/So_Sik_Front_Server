import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Container, InputGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const generateOptions = (start, end) => {
    if (start >= end) {
        return Array.from({ length: start - end + 1 }, (_, index) => end + index).reverse();
    } else {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }
};

const SelectOptions = ({ defaultValue, values, handleInputChange, name }) => (
    <Form.Select defaultValue={defaultValue} name={name} onChange={handleInputChange}>
        <option>{defaultValue}</option>
        {values.map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
        ))}
    </Form.Select>
);


function Signup() {

    const navigate = useNavigate();

    const [memberInfo, setMemberInfo] = useState({
        email: "",
        password: "",
        name: "",
        gender: "",
        birthday: "",
        height: 0,
        activityLevel: "",
        nickname: "",
        profileImage: ""  // 사용자가 프로필 이미지를 선택하지 않았을 때를 나타내기 위해서 null로 설정
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'year' || name === 'month' || name === 'day') {
            console.log(name, value)
            setMemberInfo((prevInfo) => ({
                ...prevInfo,
                birthday: {
                    ...prevInfo.birthday,
                    year: prevInfo.birthday.year || '',
                    month: prevInfo.birthday.month || '',
                    day: prevInfo.birthday.day || '',
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setMemberInfo((prevInfo) => ({
            ...prevInfo,
            profileImage: file,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        formData.append('profileImage', memberInfo.profileImage);
    
            const json = JSON.stringify(memberInfo);
            const blob = new Blob([json], {
                type: 'application/json'
            });
        formData.append('member', blob);
    
 
        try {
            console.log(memberInfo)
            const response =await axios({
                method: "post", // 통신 방식
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                url: "http://localhost:5056/members/v1/sign-up", // 서버
                data: formData
            })
            .then(function(response) {
              alert("가입을 환영합니다!")
              navigate('/mainpage');//리다이렉트


            })
        } catch (error) {
            console.error("회원가입 실패:", error); // 오류 처리
        }
    };

    const years = generateOptions(2020, 1900);
    const months = generateOptions(1, 12);
    const days = generateOptions(1, 31);


    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} >
            <strong>비활동적</strong> - 대부분의 시간을 앉아서 보내고 규칙적인 운동을 하지 않는 사람<br /><br />
            <strong>저활동적</strong> - 대부분의 시간을 앉아서 보내지만 쇼핑, 청소와 같은 가벼운 운동을 규칙적으로 하는 사람<br /><br />
            <strong>활동적</strong> - 일상적으로 꾸준한 운동이나 활동을 통해 신체적 활동량을 유지하는 사람<br /><br />
            <strong>매우 활동적</strong> - 매일 정기적으로 고강도 운동이나 체력 단련을 통해 신체 활동량을 높이는 사람
        </Tooltip>
    );

    

    return (
        <Container style={{ marginTop: '150px',marginBottom:'100px' }}>
            <Row>
                <Col></Col>
                <Col xs={6}>
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
                            <Button variant="outline-secondary" id="button-addon2">
                                중복확인
                            </Button>
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

                        <InputGroup className="mb-3">
                            <Form.Label column sm="3" >
                                이름
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={handleInputChange}
                            />
                        </InputGroup>

                        <div key={`inline-${'radio'}`} className="mb-3">
                            <Form.Label column sm="3">
                                성별
                            </Form.Label>
                            <Form.Check
                                inline
                                label="남성"
                                name="gender"
                                type={'radio'}
                                id={`inline-${'radio'}-1`}
                                value="male"
                                onChange={handleInputChange}
                            />
                            <Form.Check
                                inline
                                label="여성"
                                name="gender"
                                type={'radio'}
                                id={`inline-${'radio'}-2`}
                                value="female"
                                onChange={handleInputChange}
                            />
                        </div>

                        <Row className="mb-3">
                            <Form.Label column sm="3">
                                생년월일
                            </Form.Label>

                            <Form.Group as={Col} controlId="formGridYear">
                                <SelectOptions defaultValue="연도" values={years} name="year" handleInputChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMonth">
                                <SelectOptions defaultValue="월" values={months} name="month" handleInputChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDay">
                                <SelectOptions defaultValue="일" values={days} name="day" handleInputChange={handleInputChange} />
                            </Form.Group>
                        </Row>

                        <InputGroup className="mb-3">
                            <Form.Label column sm="3">
                                현재 체중
                            </Form.Label>
                            <Form.Control
                                aria-describedby="basic-addon2"
                                name="currentWeight"
                                onChange={handleInputChange} />
                            <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Label column sm="3">
                                목표 체중
                            </Form.Label>
                            <Form.Control
                                aria-describedby="basic-addon2"
                                name="targetWeight"
                                onChange={handleInputChange} />
                            <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Label column sm="3">
                                신장
                            </Form.Label>
                            <Form.Control
                                aria-describedby="basic-addon2"
                                name="height"
                                onChange={handleInputChange} />
                            <InputGroup.Text id="basic-addon2">cm</InputGroup.Text>
                        </InputGroup>

                        <div key={`inline-${'radio'}`} className="mb-3">
                            <Form.Label column sm="3">
                                활동 레벨
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 100, hide: 300 }}
                                    overlay={renderTooltip}>
                                    <FontAwesomeIcon icon={faCircleQuestion} />
                                </OverlayTrigger>
                            </Form.Label>

                            <Form.Check
                                inline
                                label="비활동적"
                                name="activityLevel"
                                type={'radio'}
                                id={`inline-${'radio'}-1`}
                                value="1"
                                onChange={handleInputChange}
                            />
                            <Form.Check
                                inline
                                label="저활동적"
                                name="activityLevel"
                                type={'radio'}
                                id={`inline-${'radio'}-2`}
                                value="2"
                                onChange={handleInputChange}
                            />
                            <Form.Check
                                inline
                                label="활동적"
                                name="activityLevel"
                                type={'radio'}
                                id={`inline-${'radio'}-3`}
                                value="3"
                                onChange={handleInputChange}
                            />
                            <Form.Check
                                inline
                                label="매우 활동적"
                                name="activityLevel"
                                type={'radio'}
                                id={`inline-${'radio'}-4`}
                                value="4"
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
                                onChange={handleInputChange} />
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
                                가입하기
                            </Button></div>
                    </Form>

                </Col>
                <Col> </Col>
            </Row>
        </Container>
    );
}

export default Signup;