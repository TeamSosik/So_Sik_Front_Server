import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import FreeBoardInfoHeader from "./FreeBoardInfoHeader";
import FreeBoardInfoBody from "./FreeBoardInfoBody";
import FreeBoardInfoComment from "./FreeBoardInfoComment";
import "./freeboardinfo.css";

function FreeBoardInfo() {

  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = !!window.sessionStorage.getItem("accesstoken");
  const loggedInUserId = JSON.parse(window.sessionStorage.getItem("member"))?.result?.memberId;

  const authorization = JSON.parse(window.sessionStorage.getItem("accesstoken"));
  const refreshToken = JSON.parse(window.sessionStorage.getItem("refreshtoken"));

  const getData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:5056/post/v1/${id}`,
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
        },
      });
      setPostInfo(response.data.result);
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

  const handleUpdate = () => {
    navigate(`/freeboardupdate/${id}`);
  };

  const handleList = () => {
    navigate(`/freeboard`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:5056/post/v1/${id}`,
          headers: {
            Authorization: authorization,
            RefreshToken: refreshToken,
          },
        }
        );

        if (response.status === 200) {
          navigate("/freeboard");
        } else {
          alert("게시글 삭제에 실패하였습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {postInfo && (
        <FreeBoardInfoHeader
          title={postInfo.title}
          props={postInfo.memberId}
          nickname={postInfo.nickname}
          date={postInfo.createdAt}
          hits={postInfo.hits}
        />
      )}

      <FreeBoardInfoBody content={postInfo.content}></FreeBoardInfoBody>
      <div className="buttonBox">
        <Button
          variant="outline-light"
          className="rounded-pill listbutton"
          type="button"
          onClick={handleList}
        >
          <strong>목록</strong>
        </Button>

        {isLoggedIn && loggedInUserId === postInfo.memberId && (
          <>
            <Button
              variant="outline-light"
              className="rounded-pill updatebutton"
              type="button"
              onClick={handleUpdate}
            >
              <strong>수정</strong>
            </Button>

            <Button
              variant="outline-light"
              className="rounded-pill deletebutton"
              type="button"
              onClick={handleDelete}
            >
              <strong>삭제</strong>
            </Button>
          </>
        )}
      </div>

      <FreeBoardInfoComment
        commentlist={postInfo.comments}
        postId={id}
      ></FreeBoardInfoComment>
    </div>
  );
}

export default FreeBoardInfo;
