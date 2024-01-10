import React, { useEffect } from "react";
import "./Feed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot ,faHeadset,faUser,faBagShopping} from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft,faArrowAltCircleRight ,faHeart,faComment} from "@fortawesome/free-regular-svg-icons";
import FeedComment from "./FeedComment";


const Feed = ({person}) => {
 



const defaultFeed = {
  
  
  Person :{
      id : "Minutaurus",
      nickname:"Minutaurus",
      photo:"",

  }

}
const postComment = [
  {
    nickname : "미누타우로스",
    context : "ㅋㅋㅋㅋ 식단 왜캐 열심히하누",
    img : "img/0bin.png"
  },
  {
    nickname : "미누타우로스",
    context : "살은 빼야죠...",
    img : "img/0bin.png"
  },
  {
    nickname : "KMW950701",
    context : "존잘러의 삶이란... ",
    img : "img/0bin.png"
  },
  {
    nickname : "Yong",
    context : "존잘러의 삶이란... ",
    img : "img/0bin.png"
  }

]

const postCommemtArr =  postComment.map((a,b) => {
   return <FeedComment key={b} nickname={a.nickname} context={a.context} img={a.img}></FeedComment>
    
  })





// const [feed,setFeed] = useState(defaultFeed);




  return (

    <div >
      <div className="container1">









        <div className="Thumbnail">
      
          <span className="profile">
              <img src="img/0bin.png" alt="" />
          </span>

          <span className="profile-nickname">
              {person.nickname}
          </span>
        </div>

        <div className="photoZone">
              <img src="img/myfeed1.jpg" alt="" />
              <div className="arrow-left">
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x"/>
                  
              <div/>

              <div className="arrow-right">
                  <FontAwesomeIcon icon={faArrowAltCircleRight} size="3x" />
              </div>
        </div>

          <div className="post-icon">
            
              <span >
                <FontAwesomeIcon icon={faHeart} size="2x" />              
              </span>

              <span>
                <FontAwesomeIcon icon={faComment} size="2x"/> 
              </span>

          </div>

          <div className="post-like">
            314명이 좋아해요
          </div>

          <div className="post-write">
            
            {person.context}
          </div>

          

          <div className="post-comment">        
            {postCommemtArr}
            
            <a className="more">댓글 더보기</a>
            <div className="input-group mb-3">
              
            </div>
          </div>

        </div>
        <hr></hr>
      </div>
      


      {/* <div className="container2">
        dd
      </div> */}
    </div>
    
  )

 

};

export default Feed;
