import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FreeBoardInfoHeader from "./FreeBoardInfoHeader";
import FreeBoardInfoBody from "./FreeBoardInfoBody";
import FreeBoardInfoComment from "./FreeBoardInfoComment";

function FreeBoardInfo() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  const getData = async () => {
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

    try {
      const response = await axios({
        method: "get",
        url: 'http://127.0.0.1:5056/post/v1/' + id,
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
        },
      }).then((response) => {
        
        const resultData = response.data.result;
        setPostInfo(resultData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!postInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {postInfo && (
        <FreeBoardInfoHeader
          title={postInfo.title}
          memberId={postInfo.memberId}
          date={postInfo.createdAt}
        />
      )}

      <FreeBoardInfoBody content={postInfo.content}></FreeBoardInfoBody>
      <FreeBoardInfoComment commentlist={postInfo.comments} postId={id}></FreeBoardInfoComment>
    </div>
  );
}

export default FreeBoardInfo;