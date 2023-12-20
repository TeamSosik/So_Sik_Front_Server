import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import "../common/css/login.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,BrowserRouter , Routes, Route } from 'react-router-dom';

function Login() {
  return (

    <Container>
    <Row>
        <Col></Col>
        <Col xs={3}>
            <Form>
                <Form.Group as={Col}>
                <Form.Label className='loginfont'>이메일</Form.Label>
                <Form.Control className="inputdiv" type="email" placeholder="이메일 주소" />
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label className='loginfont'>비밀번호</Form.Label>
                <Form.Control className="inputdiv" type="password" placeholder="비밀번호" />
                </Form.Group>
            
                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" className='loginfont' label="이메일 기억하기" />
                </Form.Group>

                <Button variant="success" type="submit" className='loginbutton'>
                    <strong>로그인</strong>
                </Button>
                <p className='loginfont2'><Link to="/signup">회원가입</Link> | <a href=''>비밀번호찾기</a></p>
                
                <hr></hr>
                <div className='logindiv1'>
                <a href=''><Image src="img/kakao_login.png" className="snsloginbutton"/></a><br/>
                <a href=''><Image src="img/naver_login.png" className="snsloginbutton"/></a><br/>
                </div>
            </Form>
        </Col>
        <Col></Col>
    </Row>
    
</Container>
 

  );
}

export default Login;


