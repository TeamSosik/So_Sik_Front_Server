import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./freeBoardwrite.css";

const FreeBoardWrite = () => {

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, false] }, { size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
  ];

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
  ];

  Quill.register("modules/imageResize", ImageResize);
  const modules = {
    toolbar: {
      container: toolbarOptions
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"]
    }
  };

  const [board, setBoard] = useState({ title: "", content: "" });
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const navigate = useNavigate();

  const handleBoardChange = (e) => {
    const { name, value } = e.target;
    setBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value
    }));
  };

  const handleContentChange = (content) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      content: content
    }));
  };

  const handleCreateBoardClick = async () => {
    if (board.title.trim() === "") {
      setTitleError(true);
      return;
    } else {
      setTitleError(false);
    }

    if (board.content.trim() === "") {
      setContentError(true);
      return;
    } else {
      setContentError(false);
    }

    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

    try {
      const response = await axios.post(
        "http://localhost:5056/post/v1",
        {
          title: board.title,
          content: board.content
        },
        {
          headers: {
            authorization: authorization,
            refreshtoken: refreshToken,
            "Content-Type": "application/json",
          },
        });

      if (response.status === 200) {
        alert("게시글이 성공적으로 등록되었습니다.");
        navigate("/freeboard");
      }
    } catch (error) {
      alert("게시글 등록에 실패 하였습니다. 다시 시도해주세요.");
    }
  };

  const IntakeBtnBoxView = (
    <div className='intake-btn-box'>
      <div className='intake-btn'>
        섭취음식
      </div>
      <div className='intake-btn'>
        불러오기
      </div>
    </div>
  );

  const handleNavigate = () => {
    navigate("/freeboard");
  };

  return (
    <div className="writeBox">
      <div className="title">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            value={board.title}
            onChange={handleBoardChange}
          />
          {titleError && (
            <p className="error-message">제목 입력은 필수입니다.</p>
          )}
        </Form.Group>
      </div>

      <div className="content">
        <ReactQuill
          style={{ height: "600px" }}
          modules={modules}
          formats={formats}
          theme="snow"
          value={board.content}
          onChange={handleContentChange}
          placeholder="내용을 입력해주세요."
        />
        {contentError && (
          <p className="error-message">내용 입력은 필수입니다.</p>
        )}
      </div>

      <div className="buttonBox">
        <Button
          variant="outline-light"
          className="rounded-pill writebutton"
          type="button"
          onClick={handleCreateBoardClick}
        >
          <strong>작성</strong>
        </Button>
        <Button
          variant="outline-light"
          className="rounded-pill cancelbutton"
          type="button"
          onClick={handleNavigate}
        >
          <strong>취소</strong>
        </Button>
      </div>

      {IntakeBtnBoxView}
    </div>
  );
};

export default FreeBoardWrite;