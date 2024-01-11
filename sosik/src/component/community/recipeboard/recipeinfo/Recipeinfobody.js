import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faUser,
  faFireBurner,
} from "@fortawesome/free-solid-svg-icons";
import "./recipeinfocontent.css";

function Recipeinfobody() {
  return (
    <div className="recipeinfobody">
      <Row>
        <Col></Col>
        <Col xs={5}>
          <Image src="https://placehold.it/500x500" rounded />
          <div className="maincontent">
            저의 레시피를 소개함니다
            <br />
            냠냠
          </div>

          <Card>
            <Card.Header>
              <strong>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                  인분수 <span>1인분 </span>
                </span>
                <span>
                  <FontAwesomeIcon icon={faHourglassHalf} />
                  준비시간 <span>10분 </span>
                </span>
                <span>
                  <FontAwesomeIcon icon={faFireBurner} />
                  요리시간 <span>10분 </span>
                </span>
              </strong>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> 재료 </p>
                <footer className="blockquote-footer">닭 (200g)</footer>
                <footer className="blockquote-footer">파</footer>
                <footer className="blockquote-footer">양파</footer>
              </blockquote>

              <blockquote className="blockquote mb-0">
                <p> 양념 </p>
                <footer className="blockquote-footer">간장 2큰술(20g)</footer>
                <footer className="blockquote-footer">소금</footer>
                <footer className="blockquote-footer">설탕</footer>
              </blockquote>
            </Card.Body>
          </Card>

          <Card className="maincontent2">
            <Card.Header>Step. 1</Card.Header>
            <Image variant="top" src="https://placehold.it/500x500" />
            <Card.Body>
              <Card.Title>
                <span>Step. 1 </span>
                <span>재료를 손질해주세요</span>
              </Card.Title>
              <Card.Text>설명이 들어감니다</Card.Text>
            </Card.Body>
          </Card>

          <Card className="maincontent2">
            <Card.Header>Step. 2</Card.Header>
            <Image variant="top" src="https://placehold.it/500x500" />
            <Card.Body>
              <Card.Title>
                <span>Step. 2 </span>
                <span>재료를 손질해주세요</span>
              </Card.Title>
              <Card.Text>설명이 들어감니다</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default Recipeinfobody;
