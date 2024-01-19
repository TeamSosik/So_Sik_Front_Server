import React, { useEffect, useState, createContext } from "react";
import logo from "../../../images/logo.png";
import "./header.css";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

import Feed from "../../feed/Feed.js";

import Mainpage from "../../../page/MainPage.js";

import Login from "../../member/loginform/Login.js";
import FoodSearch from "../../food/foodSearch/FoodSearch.js";
import Signup from "../../member/signupform/Signup.js";
import axios from "axios";
import RecdKcal from "../../intake/record/RecdKcal.js";
import RecdAnly from "../../intake/record/RecdAnly.js";
import UpdateInfo from "../../member/updatemyinfo/UpdateInfo.js";
import FoodDetail from "./../../food/foodDetail/FoodDetail";
import RedirectionKakao from "../../member/loginform/social/RedirectionKakao.js";
import FindPw from "../../member/loginform/FindPw.js";
import SnsInfo from "../../member/loginform/social/SnsInfo.js";
import MyPage from "../../member/mypage/Mypage";
import SearchBox from "../header/SearchBox.js";
import FreeBoard from "../../community/freeboard/FreeBoard.js";
import NotificationList from "./NotificationList";

export const HeaderContext = createContext();

const Header = () => {
  const [logout, setlogout] = useState(true);

  useEffect(() => {
    const access = window.localStorage.getItem("accesstoken");
    if (access === null) {
      setlogout(true);
    } else {
      setlogout(false);
    }
  }, [logout]);

  const handleLogout = async () => {
    try {
      const accesstoken = JSON.parse(
        window.localStorage.getItem("accesstoken")
      );
      const refreshtoken = JSON.parse(
        window.localStorage.getItem("refreshtoken")
      );
      const member = JSON.parse(window.localStorage.getItem("member"));

      console.log(accesstoken);
      console.log(refreshtoken);
      console.log(member.result.email);

      await axios({
        method: "post",
        url: "/members/v1/sign-out",
        baseURL: "http://localhost:5056",
        headers: {
          authorization: accesstoken,
          refreshToken: refreshtoken,
          member: member.result.email,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ email: member.result.email }),
      });

      window.localStorage.removeItem("accesstoken");
      window.localStorage.removeItem("refreshtoken");
      window.localStorage.removeItem("member");

      setlogout(true);
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  let loginview = "";

  if (logout === false) {
    loginview = (
      <>
        <li>
          <Link to="/freeboard" style={{ marginRight: "30px" }}>
            커뮤니티
          </Link>
          <Link to="/mypage" style={{ marginRight: "30px" }}>
            마이페이지
          </Link>
          <Link
            to="/mainpage"
            style={{ marginRight: "30px" }}
            onClick={handleLogout}
          >
            로그아웃
          </Link>
          <NotificationList />
        </li>
      </>
    );
  } else {
    loginview = (
      <li>
        <Link to="/freeboard" style={{ marginRight: "30px" }}>
          커뮤니티
        </Link>
        <Link to="/login">로그인</Link>
      </li>
    );
  }

  return (
    <BrowserRouter>
      <header id="header" className="nav-down">
        <Link to="/mainpage" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <nav id="gnb">
          {/* <Autocomplete></Autocomplete> */}
          <SearchBox></SearchBox>
        </nav>
        <div className="utWrap">
          <ul className="logWrap">{loginview}</ul>

          <button
            type="button"
            class="ham"
            onclick="$(this).toggleClass('cross')"
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>
      </header>

      <HeaderContext.Provider value={{ setlogout }}>
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainpage" element={<Mainpage props={logout} />} />
          <Route path="/foodsearch" element={<FoodSearch />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/recdkcal" element={<RecdKcal />} />
          <Route path="/recdanly" element={<RecdAnly />} />
          <Route path="/updateinfo" element={<UpdateInfo />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/redirection" element={<RedirectionKakao />} />
          <Route path="/findPw" element={<FindPw />} />
          <Route path="/snsInfo" element={<SnsInfo />} />
          <Route path="/freeboard" element={<FreeBoard />} />
        </Routes>
      </HeaderContext.Provider>
    </BrowserRouter>
  );
};

export default Header;
