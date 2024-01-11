import React from "react";
import "./feedComment.css";

const FeedComment = ({ nickname, context, img }) => {
  return (
    <div>
      <div className="post-comment">
        <img src={img} alt="" />
        <span className="post-comment-nick"> {nickname}</span>
        <span className="post-comment-write">{context}</span>
      </div>
    </div>
  );
};

export default FeedComment;
