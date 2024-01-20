import React, { useEffect, useState } from "react";
import "./mypage.css";
import Aside from "./aside/Aside";
import MyInfo from "./content/MyInfo";
import Graph from "./content/Graph";
import axios from "axios";

const MyPage = () => {
  const [users, setUsers] = useState({
    memberId: "",
    email: "",
    name: "",
    gender: "",
    height: 0,
    role: "",
    activityLevel: "",
    nickname: "",
    profileImage: "",
    birthday: "",
    tdeeCalculation: "",
    weightList: [""],
  });
  const getMemberDetail = async () => {
    const authorization = JSON.parse(localStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshtoken"));

    try {
      await axios({
        method: "get",
        url: "http://localhost:5056/members/v1/detail",
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setUsers(response.data.result);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMemberDetail();
  }, []);
  return (
    <div className="my-page">
      <Aside props={users} />
      <div className="right-section">
        <MyInfo props={users} />
        <Graph props={users} />
      </div>
    </div>
  );
};

export default MyPage;
