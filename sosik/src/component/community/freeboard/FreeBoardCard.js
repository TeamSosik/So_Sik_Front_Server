import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './freeboardcard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faComment } from "@fortawesome/free-regular-svg-icons";

const FreeBoardCard = (props) => {
    const createdAtDate = new Date(props.content.createdAt);
    const formattedDate = `${createdAtDate.getFullYear()}-${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}-${createdAtDate.getDate().toString().padStart(2, '0')} ${createdAtDate.getHours().toString().padStart(2, '0')}:${createdAtDate.getMinutes().toString().padStart(2, '0')}`;
    
    const [nickname, setNickname] = useState([]);

 const getData = async () => {
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));
    const nickname2 = props.content.memberId;

    try {
      const response = await axios({
        method: "get",
        url: 'http://127.0.0.1:5056/members/v1/' + nickname2,
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
        <div className='card-container'>
            <Card>
                <div className="freeboard-card">
                    <div className="col-sm-6 col-md-3">
                        <div className="freeboard-title">
                            <h4>{props.content.title}</h4>
                        </div>
                        <span>
                            {nickname} | {formattedDate}
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
    )
}

export default FreeBoardCard