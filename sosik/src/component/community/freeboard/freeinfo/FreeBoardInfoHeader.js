import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./freeboardinfoheader.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
function FreeBoardInfoHeader({ title, memberId, date, hits }) {
  const createdAtDate = new Date(date);
  const formattedDate = `${createdAtDate.getFullYear()}-${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}-${createdAtDate.getDate().toString().padStart(2, '0')} ${createdAtDate.getHours().toString().padStart(2, '0')}:${createdAtDate.getMinutes().toString().padStart(2, '0')}`;

  const [nickname, setNickname] = useState([]);

  const getData = async () => {
      const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
      const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

      try {
        const response = await axios({
          method: "get",
          url: 'http://localhost:5056/members/v1/nickname/' + memberId,
          headers: {
            authorization: authorization,
            refreshToken: refreshToken,
          },
        }).then((response) => {
          const resultData = response.data;
          setNickname(resultData);
        });
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getData();
    }, []);

  return (
    <Row className="freeinfoheaderesult">
      <Col></Col>
      <Col xs={6}>
        <div className="freeinfoheader">
          <div className="freeinfotitle">{title}</div>
          
          <div className="freeinfonamedate">
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
