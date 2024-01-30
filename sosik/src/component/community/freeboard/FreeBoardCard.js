import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./freeboardcard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faComment } from "@fortawesome/free-regular-svg-icons";
import { Image } from "react-bootstrap";

const FreeBoardCard = (props) => {
  const createdAtDate = new Date(props.content.createdAt);
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
    <div className="card-container">
      <Card className="freeboard-card">
        <div>
          <div className="col-sm-6 col-md-3">
            <div className="freeboard-title">
              <h4>{props.content.title}</h4>
            </div>
            <span>
              <Image
                src={`http://localhost:5056/members/v1/images/${props.content.memberId}`}
                alt="프로필 이미지"
                roundedCircle
                width="35"
                height="35"
              />{" "}
              | {props.content.nickname} | {formattedDate}
            </span>

            <span className="freeboard-view">
              <FontAwesomeIcon icon={faEye} />
              {props.content.hits}
            </span>
            <span className="freeboard-comment">
              <FontAwesomeIcon icon={faComment} />
              {props.content.commentCount}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FreeBoardCard;
