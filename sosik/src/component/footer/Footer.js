import React from 'react';
import './footer.css';
import logo from '../../images/logo.png';
import test from '../../images/test.png';
import logo_white from '../../images/logo_white.png';

// 상위 푸터 컴포넌트
const UpperFooter = () => {
    return (
        <div className="upper-footer">
            <div className="footer-logo">
                <img src={logo} alt="Logo" />
                {/* <img src={logo_white} alt="Logo" /> */}
            </div>
            <div className="footer-info">
                <div className="box">
                    <a href='https://github.com/odadang'><img src={test} className="profile" /></a>
                    <img src={test} className="profile" />
                    <img src={test} className="profile" />
                    <img src={test} className="profile" />
                    <img src={test} className="profile" />
                </div>
            </div>
        </div>
    );
};

// 하위 푸터 컴포넌트
const LowerFooter = () => {
    return (
        <div className='lower-footer'>
            <p className="credit">
                © 2023. Sosik all rights reserved.
            </p>
        </div>
    );
};

// 전체 푸터 컴포넌트
const Footer = () => {
    return (
        <div>
            <UpperFooter />
            <LowerFooter />
        </div>
    );
};


export default Footer;
