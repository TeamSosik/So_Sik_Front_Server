import React from "react";
import "../../common/css/header/Myheader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const MyHeader = () => {
const menuList =["SNS", "랭킹", "칼로리", "커뮤니티"]
const iconList =[
  { 
    alt: "위치",
    image: <FontAwesomeIcon icon={faLocationDot} />,
    url: "#",
  },


  { 
    alt: "고객센터",
    image: <FontAwesomeIcon icon={faHeadset} />,
    url: "#",
  },
  { 
    alt: "마이페이지",
    image: <FontAwesomeIcon icon={faUser} />,
    url: "#",
  },
  { 
    alt: "장바구니",
    // image: <FontAwesomeIcon icon="fa-solid fa-bag-shopping" />,
    image: <FontAwesomeIcon icon={faBagShopping} /> ,
    url: "#",
  },
]

  return (

      <header className="dummy_header"  role="banner">
        <div className="main_header">
          <div className="logo">
            <img src="img/logo.png" alt=""/>
          </div>
          <div className="menu" role="navigation" aria-label="메인 메뉴">
            <ul>
              {menuList.map((listName)=>(
                <li><a href="#"> {listName}</a></li>
              ))}
            </ul>
          </div>

          <div className="icon">
             {iconList.map((item)=>(
                <li><a href="#"> {item.image}</a></li>
              ))}
          </div>
        </div>
      </header>
      
    
  )

 

};

export default MyHeader;
