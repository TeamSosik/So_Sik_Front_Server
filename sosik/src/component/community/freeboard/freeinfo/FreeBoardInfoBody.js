import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./freeboardinfobody.css";
import { useEffect } from "react";

function FreeBoardInfoBody({content}) {

  useEffect(()=>{
    document.querySelector(".maincontent").innerHTML = content;
  },[]
  )

  return (
    <div className="recipeinfobody">
      <Row>
        <Col></Col>
        <Col xs={7}>
          <div className="maincontent">
            {content}
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default FreeBoardInfoBody;
