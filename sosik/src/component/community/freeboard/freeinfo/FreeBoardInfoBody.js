import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./freeboardinfobody.css";

function FreeBoardInfoBody({content}) {
  return (
    <div className="recipeinfobody">
      <Row>
        <Col></Col>
        <Col xs={5}>
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
