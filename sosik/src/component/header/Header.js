import React from "react";
import logo from "../../images/logo.png";
import "../../common/css/header/header.css";

const Header = () => {
  return (
    <header id="header" class="nav-down">
      <a class="logo" href="/">
      <img src={logo} alt="Logo" />
      </a>
      <nav id="gnb">
        <ul class="depth-1">
          <li><a href="/guide/list">SNS</a>
          </li>
          <li><a href="/recipe-lab/list/recipe">랭킹</a>
            <ul class="depth-2">
              <li><a href="/recipe-lab/list/recipe">레시피</a>
              </li><li><a href="/recipe-lab/list/solution">솔루션</a>
              </li></ul>
          </li>
          <li><a href="/cooking/list">칼로리</a>
            <ul class="depth-2">
              <li><a href="/cooking/list">요리해요</a>
              </li><li><a href="/counseling/list">고민있어요</a>
              </li></ul>
          </li>
          <li><a href="/wow/list">커뮤니티</a>
          </li>
        </ul>
      </nav>
      <div class="utWrap">
        <ul class="logWrap">
          <li><a href="https://member.sempio.com/login?r=7d04a443ad6a5706efcd37ba0299bf38&amp;s=semie">로그인</a></li>
        </ul>
        <div class="searchWrap">
          <input type="text" placeholder="어떤 요리가 궁금하신가요?" />
          <button class="" type="button" id="topSearchBtn">검색</button>
        </div>
        {/* <div class="searchWrap">
          <input type="text" name="q"/>
            <button id="topSearchBtn" class="" type="button" onclick="topSearch()">검색</button>
        </div> */}

        <button type="button" class="ham" onclick="$(this).toggleClass('cross')">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </button>
      </div>
      {/* <div class="scrollindicator" style="visibility: visible;">
        <div class="scrollprogress" style="transform: translate3d(-100%, 0px, 0px);"></div>
      </div> */}
    </header>
  );
};

export default Header;
