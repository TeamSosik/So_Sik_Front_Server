import React, { useState } from "react";
import ReactQuill, {Quill} from "react-quill";
import "./freeBoardwrite.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { useNavigate } from "react-router-dom";

const FreeBoardWrite = () => {

  const toolbarOptions = [
    
    [{ header: [1, 2, 3, 4, 5, false] }, { size: ["small", false, "large", "huge"]}],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
  ]

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
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const defaultBoard = {
    title: "",
  }

  const [board, setBoard] = useState(defaultBoard);
  const [content, setContent] = useState(defaultBoard);
  const navigate = useNavigate();

  // title 값이 변할 때 작동합니다.
  const handleBoardChange = (e) => {
    const {name, value} = e.target;
    setBoard((current) => {   
      return {
        ...current,
        [name]: value
      }
    });
  };

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleCreateBoardClick = async () => {
    const data = {
      title: board.title,
      content: content
    };

    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

    try {
      const response = await axios.post(
        "http://localhost:5056/post/v1",
        data,
        {
          headers: {
            authorization: authorization,
            refreshtoken: refreshToken,
          },
        }
      );

      if (response.status === 200) {
        alert("게시글이 성공적으로 등록되었습니다.")
        navigate("/freeboard");
      }
    } catch (error) {
      alert("게시글 등록에 실패 하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="writeBox">
      <div className="title">
      <Form.Group className="mb-3">
        <Form.Control
        type="text"
        name="title"
        placeholder="제목을 입력해주세요"
        onChange={handleBoardChange} />
      </Form.Group>
      </div>

      <div className="content">
        <ReactQuill
          style={{height: "600px"}}
          modules={modules}
          formats={formats}
          theme="snow"
          name="content"
          onChange={handleContentChange}
          placeholder="내용을 입력해주세요."
        />
      </div>

      <div className="buttonBox">
       <Button
          variant="outline-light"
          className="rounded-pill writebutton"
          type="button"
          onClick={handleCreateBoardClick}>
          <strong>작성</strong>
        </Button>
      </div>
    </div>
  );
};

export default FreeBoardWrite;