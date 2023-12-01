import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../common/css/section3/inputkcal.css";

function Inputkcalcard() {
  return (
    <Card
      bg={"white".toLowerCase()}
      key={"white"}
      text={"white".toLowerCase() === "dark"}
      className="inputkcalcard mb-2"
    >
      <Card.Body>
        <Card.Title className="inputkcalcardtitle mb-2">
          오늘의 목표칼로리
        </Card.Title>
        <Card.Text>
          <div className="d-flex">
            <Form.Control type="text" className="kcalform mr-2" />
            <span className="kcal">kcal</span>
            <Button variant="success" className="kcalbutton">
              설정
            </Button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Inputkcalcard;
