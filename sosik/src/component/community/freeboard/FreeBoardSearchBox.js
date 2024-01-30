import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./freeboardsearchbox.css";
import FreeBoardWriteBtn from "./FreeBoardWriteBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const FreeBoardSearchBox = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // 검색어를 부모 컴포넌트로 전달
    onSearch(searchKeyword);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <FreeBoardWriteBtn />
        </Col>

        <Col sm={3}>
          <Form onSubmit={handleSearch} className="d-flex search">
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-2 rounded-pill no-focus-border outline-none"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button
              variant="outline-light"
              className="rounded-pill searchbutton"
              type="submit"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Form>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </Container>
  );
};

export default FreeBoardSearchBox;