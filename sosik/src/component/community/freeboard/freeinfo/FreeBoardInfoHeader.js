import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./freeboardinfoheader.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
function FreeBoardInfoHeader({ title, memberId, date }) {
  const createdAtDate = new Date(date);
  const formattedDate = `${createdAtDate.getFullYear()}-${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}-${createdAtDate.getDate().toString().padStart(2, '0')} ${createdAtDate.getHours().toString().padStart(2, '0')}:${createdAtDate.getMinutes().toString().padStart(2, '0')}`;

  const [nickname, setNickname] = useState([]);

  const getData = async () => {
      const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
      const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));
      // console.log({memberId});

      try {
        const response = await axios({
          method: "get",
          url: 'http://127.0.0.1:5056/members/v1/' + memberId,
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
    <Row className="recipeheaderesult">
      <Col></Col>
      <Col xs={7}>
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
