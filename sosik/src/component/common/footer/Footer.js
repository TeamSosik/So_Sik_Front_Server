import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

const Footer = () => {

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  return (
    <footer id="footer">
      <div className="inner">
        <div className="ft_left">
          <ul className="ft_link">
            <li>
              <a href="https://member.sempio.com/legal/terms-and-condition">
                이용약관
              </a>
            </li>
            <li>
              <a href="https://member.sempio.com/legal/privacy-policy">
                개인정보처리방침
              </a>
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
            <li>플레이데이터 백엔드 4기</li>
          </ul>
          <copy>Copyright © 2023. Sosik, All Rights Reserved.</copy>
        </div>
        <div className="ft_right">
          <button
            className={`ft_top ${showScroll ? "visible" : ""}`}
            onClick={scrollTop}>
            <FontAwesomeIcon icon={faArrowUp} size="lg" style={{ color: "#000000" }} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
