import React from "react";
import logo from "../../images/logo.png";
import "../../common/css/header/header.css";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Recipeboardlist from "../../page/Recipeboardlist";
import Feed from "../Feed/FeedContainer";
import Mainpage from "../../page/MainPage";
import Login from "../Login";
import FoodSearch from "../foodSearch/FoodSearch";
import Signup from "../Signup";
import Mypage from "../../page/mypage";

const Header = () => {
  return (
    <BrowserRouter>
      <header id="header" className="nav-down">
        {/* <a className="logo" href="/"> */}
        <Link to="/mainpage" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        {/* </a> */}
        <nav id="gnb">
          <ul className="depth-1">
            <li>
              <Link to="/foodsearch">칼로리</Link>
            </li>
            {/* <li><a href="">랭킹</a>
              <ul className="depth-2">
                <li><a href="">레시피</a>
                </li></ul>
            </li> */}
            <li>
              <Link to="/feed">SNS</Link>
            </li>
            <li>
              <Link to="/recipeboardlist">커뮤니티</Link>
              <ul className="depth-2">
                <li>
                  <Link to="/recipeboardlist">요리해요</Link>
                </li>
                <li>
                  <a href="">고민있어요</a>
                </li>
                <li>
                  <a href="">성공했어요</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="utWrap">
          <ul className="logWrap">
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
          <ul className="logWrap">
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
          </ul>
          <div className="searchWrap">
            <input type="text" placeholder="어떤 요리가 궁금하신가요?" />
            <button className="" type="button" id="topSearchBtn">
              검색
            </button>
          </div>
          {/* <div class="searchWrap">
          <input type="text" name="q"/>
            <button id="topSearchBtn" class="" type="button" onclick="topSearch()">검색</button>
        </div> */}

          <button
            type="button"
            class="ham"
            onclick="$(this).toggleClass('cross')"
          >
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </button>
        </div>
        {/* <div class="scrollindicator" style="visibility: visible;">
        <div class="scrollprogress" style="transform: translate3d(-100%, 0px, 0px);"></div>
      </div> */}
      </header>

      <Routes>
        <Route path="/recipeboardlist" element={<Recipeboardlist />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/foodsearch" element={<FoodSearch />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Header;
