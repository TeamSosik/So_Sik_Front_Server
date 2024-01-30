import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./freeboardinfoheader.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";

function FreeBoardInfoHeader({ title, props, nickname, date, hits }) {
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
    <Row className="freeinfoheaderesult">
      <Col></Col>
      <Col xs={6}>
        <div className="freeinfoheader">
          <div className="freeinfotitle">{title}</div>

          <div className="freeinfonamedate">
            <span>
              <Image
                src={`http://localhost:5056/members/v1/images/${props}`}
                alt="프로필 이미지"
                roundedCircle
                style={{ width: "30px", height: "30px", marginRight: "5px"}}
              />
            </span>
            <span className="freeinfoname">{nickname}</span> |{" "}
            <span className="freeinfodate">{formattedDate}</span>
            <div className="freeinfohits">조회수: {hits + 1}</div>
          </div>
        </div>
        <hr />
      </Col>
      <Col></Col>
    </Row>
  );
}

export default FreeBoardInfoHeader;
