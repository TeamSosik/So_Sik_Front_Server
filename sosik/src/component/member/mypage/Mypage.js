import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./mypage.css";
import Aside from "./aside/Aside";
import MyInfo from "./content/MyInfo";
import Graph from "./content/Graph";
import axios from "axios";

const MyPage = () => {
  const navigate = useNavigate();

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
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));
    const member = JSON.parse(sessionStorage.getItem("member"));

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
        if (response.data.result.tdeeCalculation === null) {
          alert("가입을 마무리 해주세요!")
          navigate("/updatesnsinfo");
        } else {
          setUsers(response.data.result);
        }
        
          
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
