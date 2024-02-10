import React, { useEffect, useState, createContext, useRef, useReducer } from "react";
import logo from "../../../images/logo.png";
import "./header.css";
import { Link, BrowserRouter, Routes, Route, Router, Navigate } from "react-router-dom";
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
import FreeBoardWrite from "../../community/freeboard/FreeBoardWrite.js";
import FreeBoardInfo from "../../community/freeboard/freeinfo/FreeBoardInfo.js";
import FreeBoardUpdate from "../../community/freeboard/FreeBoardUpdate.js";
import Error404 from "../error/Error404.js"
import RequireAuth from "../auth/RequireAuth.js";
import UpdatesnsInfo from "../../member/updatemyinfo/UpdatesnsInfo.js"

export const HeaderContext = createContext();

const Header = () => {
  
  const [logout, setlogout] = useState(true);

  useEffect(() => {
    const access = window.sessionStorage.getItem("accesstoken");
    if (access === null) {
      setlogout(true);
    } else {
      setlogout(false);
    }
  }, [logout]);

  const handleLogout = async () => {
    try {
      const accesstoken = JSON.parse(
        window.sessionStorage.getItem("accesstoken")
      );
      const refreshtoken = JSON.parse(
        window.sessionStorage.getItem("refreshtoken")
      );
      const member = JSON.parse(window.sessionStorage.getItem("member"));

      await axios({
        method: "post",
        url: "/members/v1/sign-out",
        baseURL: "http://43.200.224.252:5056",
        headers: {
          authorization: accesstoken,
          refreshToken: refreshtoken,
          member: member.result.email,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ email: member.result.email }),
      });

      window.sessionStorage.removeItem("accesstoken");
      window.sessionStorage.removeItem("refreshtoken");
      window.sessionStorage.removeItem("member");

      setlogout(true);

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
            to="/"
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
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <nav id="gnb">
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

          <Route path="/" element={<Mainpage props={logout} />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findPw" element={<FindPw />} />
          <Route path="/updateinfo" element={<RequireAuth><UpdateInfo /></RequireAuth>} />
          <Route path="/snsInfo" element={<SnsInfo />} />
          <Route path="/redirection" element={<RedirectionKakao />} />

          <Route path="/mypage" element={<RequireAuth><MyPage /></RequireAuth>} />
          <Route path="/recdkcal" element={<RequireAuth><RecdKcal /></RequireAuth>} />
          <Route path="/recdanly" element={<RequireAuth><RecdAnly /></RequireAuth>} />

          <Route path="/foodsearch" element={<FoodSearch />} />
          <Route path="/food/:id" element={<FoodDetail />} />

          <Route path="/freeboard" element={<FreeBoard />} />
          <Route path="/freeboard/:id" element={<FreeBoardInfo />} />
          <Route path="/freeboardwrite" element={<RequireAuth><FreeBoardWrite /></RequireAuth>} />
          <Route path="/freeboardupdate/:id" element={<RequireAuth><FreeBoardUpdate /></RequireAuth>} />
          
          <Route path="/feed" element={<Feed />} />
          <Route path="/updatesnsinfo" element={<UpdatesnsInfo/>}/>


          <Route path="*" element={<Error404 />} />

        </Routes>
      </HeaderContext.Provider>
    </BrowserRouter>
  );
};

export default Header;
