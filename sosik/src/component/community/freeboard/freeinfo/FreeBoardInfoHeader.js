import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./freeboardinfoheader.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function FreeBoardInfoHeader({ title, nickname, date }) {
  const createdAtDate = new Date(date);
  const formattedDate = `${createdAtDate.getFullYear()}-${(
    createdAtDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${createdAtDate
    .getDate()
    .toString()
    .padStart(2, "0")} ${createdAtDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${createdAtDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <Row className="recipeheaderesult">
      <Col></Col>
      <Col xs={6}>
        <div className="recipeheader">
          <div className="recipeinfotitle">{title}</div>
          <div className="recipeinfonamedate">
            <span className="recipeinfoname">{nickname}</span> |{" "}
            <span className="recipeinfodate">{formattedDate}</span>
          </div>
        </div>
        <hr />
      </Col>
      <Col></Col>
    </Row>
  );
}

export default FreeBoardInfoHeader;
