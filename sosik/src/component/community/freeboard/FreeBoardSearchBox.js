import React, { useState } from "react";
import { Button, Form, } from "react-bootstrap";
import "./freeboardsearchbox.css";
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
    <>
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
    </>
  );
};

export default FreeBoardSearchBox;