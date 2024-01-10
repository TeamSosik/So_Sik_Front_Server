import React from "react";
import "../../common/css/footer/footer.css";

// 상위 푸터 컴포넌트
const Footer = () => {
  return (
    <footer id="footer">
      <div className="inner">
        <div className="ft_left">
          <ul className="ft_link">
            <li>
              <a href="https://member.sempio.com/legal/terms-and-condition">이용약관</a>
            </li>
            <li>
              <a href="https://member.sempio.com/legal/privacy-policy">개인정보처리방침</a>
            </li>
            <li>
              <a href="/userguide">이용 가이드</a>
            </li>
            <li>
              <a href="/aboutus">ABOUT US</a>
            </li>
          </ul>
          <ul className="ft_info">
            <li>소식</li>
            <li>서울특별시 중구 충무로2 (우편번호: 04557)</li>
          </ul>
          <copy>Copyright © 2023. Sosik, All Rights Reserved.</copy>
        </div>
        <div className="ft_right">
          <ul className="ft_sns">
            <li><a href="https://www.instagram.com/semie_kitchen/" target="_blank"><img src="/assets/images/common/ic_insta.png" alt="" /></a></li>
            <li><a href="https://pf.kakao.com/_Hxoxkxab" target="_blank"><img src="/assets/images/common/ic_kakao.png" alt="" /></a></li>
            <li className="sitemap">
              <button type="button" onclick="$(this).toggleClass('on').siblings().slideToggle(200)">관련사이트 <img src="/assets/images/common/ic_plus_b.png" alt="" /></button>
              <div className="siteList">
                <ul>
                  <li><a href="https://www.sempio.com/" target="_blank">샘표 기업</a></li>
                  <li><a href="https://semie.cooking/" target="_blank">새미네부엌 플랫폼</a></li>
                  <li><a href="http://www.tasiakitchen.co.kr/" target="_blank">티·아시아</a></li>
                  <li><a href="http://www.semie-kitchen.com/" target="_blank">새미네부엌</a></li>
                  <li><a href="http://www.fontanastyle.com/" target="_blank">폰타나</a></li>
                  <li><a href="https://sempio.recruiter.co.kr/" target="_blank">샘표 채용</a></li>
                  <li><a href="https://member.sempio.com/" target="_blank">샘표 통합회원 웹사이트</a></li>
                </ul>
              </div>
            </li>
          </ul>
          <button className="ft_top" type="button" onclick="$('body,html').animate({scrollTop:0})">맨 위로</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
