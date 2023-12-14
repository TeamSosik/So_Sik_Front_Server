import { Button, Col, Container, Form, Row } from "react-bootstrap";
import '../../../common/css/recipecss/recipelist/recipesearch.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function SearchBar() {
  return (
    <Container className="mt-5">
      <Row>
        <Col></Col>
        
        <Col sm={3}>
          <Form className="d-flex search">
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-2 rounded-pill no-focus-border outline-none"
            />
            <Button variant="outline-light" className="rounded-pill searchbutton" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Form>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </Container>
  );
}