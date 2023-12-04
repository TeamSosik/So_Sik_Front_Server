import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Container, InputGroup, Button, OverlayTrigger,Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const generateOptions = (start, end) => {
    if (start >= end) {
        return Array.from({ length: start - end + 1 }, (_, index) => end + index).reverse();
    } else {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }
};

const SelectOptions = ({ defaultValue, values }) => (
    <Form.Select defaultValue={defaultValue}>
        <option>{defaultValue}</option>
        {values.map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
        ))}
    </Form.Select>
);
  
function Signup() {
    const years = generateOptions(2010, 1900);
    const months = generateOptions(1, 12);
    const days = generateOptions(1, 31);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} >
            <strong>비활동적</strong> - 대부분의 시간을 앉아서 보내고 규칙적인 운동을 하지 않는 사람<br/><br/>
            <strong>저활동적</strong> - 대부분의 시간을 앉아서 보내지만 쇼핑, 청소와 같은 가벼운 운동을 규칙적으로 하는 사람<br/><br/>
            <strong>활동적</strong> - 일상적으로 꾸준한 운동이나 활동을 통해 신체적 활동량을 유지하는 사람<br/><br/>
            <strong>매우 활동적</strong> - 매일 정기적으로 고강도 운동이나 체력 단련을 통해 신체 활동량을 높이는 사람<br/><br/>
        </Tooltip>
        );

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={6}>
                <Form>
                    <InputGroup className="mb-3">
                        <Form.Label column sm="3">
                        이메일
                        </Form.Label>
                        
                        <Form.Control
                            // placeholder="example@sosik.com"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"/>
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
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Label column sm="3">
                        비밀번호 확인
                        </Form.Label>
                        <Form.Control
                        type="password"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Label column sm="3">
                        이름
                        </Form.Label>
                        <Form.Control
                        type="text"
                        />
                    </InputGroup>

                    <div key={`inline-${'radio'}`} className="mb-3">
                        <Form.Label column sm="3">
                        성별
                        </Form.Label>
                        <Form.Check
                            inline
                            label="남성"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-1`}
                        />
                        <Form.Check
                            inline
                            label="여성"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-2`}
                        />
                    </div>

                    <Row className="mb-3">
                        <Form.Label column sm="3">
                            생년월일
                        </Form.Label>

                        <Form.Group as={Col} controlId="formGridYear">
                            <SelectOptions defaultValue="연도" values={years} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMonth">
                            <SelectOptions defaultValue="월" values={months} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDay">
                            <SelectOptions defaultValue="일" values={days} />
                        </Form.Group>
                    
                    </Row>

                    <InputGroup className="mb-3">
                        <Form.Label column sm="3">
                        현재 체중
                        </Form.Label>
                        <Form.Control
                        aria-describedby="basic-addon2"/>
                        <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Label column sm="3">
                        목표 체중
                        </Form.Label>
                        <Form.Control
                        aria-describedby="basic-addon2"/>
                        <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Label column sm="3">
                        신장
                        </Form.Label>
                        <Form.Control
                        aria-describedby="basic-addon2"/>
                        <InputGroup.Text id="basic-addon2">cm</InputGroup.Text>
                    </InputGroup>
                    
                    <div key={`inline-${'radio'}`} className="mb-3">
                        <Form.Label column sm="3">
                        활동레벨
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
                            name="group2"
                            type={'radio'}
                            id={`inline-${'radio'}-1`}
                        />
                        <Form.Check
                            inline
                            label="저활동적"
                            name="group2"
                            type={'radio'}
                            id={`inline-${'radio'}-2`}
                        />
                        <Form.Check
                            inline
                            label="활동적"
                            name="group2"
                            type={'radio'}
                            id={`inline-${'radio'}-3`}
                        />
                        <Form.Check
                            inline
                            label="매우 활동적"
                            name="group2"
                            type={'radio'}
                            id={`inline-${'radio'}-4`}
                        />
                    </div>

                    <InputGroup className="mb-3">
                        <Form.Label column sm="3">
                        닉네임
                        </Form.Label>
                        
                        <Form.Control
                            
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"/>
                            <Button variant="outline-secondary" id="button-addon2">
                            중복확인
                            </Button>
                    </InputGroup>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>프로필 이미지</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <div className="text-center">
                    <Button variant="success" type="submit" >
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

