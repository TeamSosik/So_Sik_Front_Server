import React, { useState, useEffect } from "react";
import axios from "axios";
import "./freeboardlist.css";
import FreeBoardCard from "./FreeBoardCard";
import { Link } from "react-router-dom";

const FreeBoardList = () => {
  const [free, setFree] = useState([]);

  const getData = async () => {
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

    try {
      const response = await axios({
        method: "get",
        url: 'http://127.0.0.1:5056/post/v1/',
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
        },
      }).then((response) => {
        const resultData = response.data.result;
        setFree(resultData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="freeboard-list">
    {free.map((data) => (
      <Link to={`/freeboard/${data.id}`} key={data.id} style={{ textDecoration: "none"}}>
        <FreeBoardCard content={data} />
      </Link>
    ))}
  </div>
    
  );
};

export default FreeBoardList;