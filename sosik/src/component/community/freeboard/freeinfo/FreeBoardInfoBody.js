import { Col, Row } from 'react-bootstrap';

function FreeBoardInfoBody({ content }) {

  return (
    <div className="recipeinfobody">
      <Row>
        <Col></Col>
        <Col xs={6}>
          <div className="maincontent" dangerouslySetInnerHTML={{ __html: content }} />
        </Col>
        <Col></Col>

      </Row>
    </div>
  );
}

export default FreeBoardInfoBody;
