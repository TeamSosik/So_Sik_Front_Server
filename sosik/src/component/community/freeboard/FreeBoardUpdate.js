import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./freeboardupdate.css";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";

Quill.register("modules/imageResize", ImageResize);

const FreeBoardUpdate = () => {

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, false] }, { size: ["small", false, "large", "huge"] }],
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
  ];

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

  const defaultContent = {
    content: "",
  }

  const { id } = useParams();
  const [board, setBoard] = useState(defaultBoard);
  const [content, setContent] = useState(defaultContent);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const navigate = useNavigate();

  const authorization = JSON.parse(window.sessionStorage.getItem("accesstoken"));
  const refreshToken = JSON.parse(window.sessionStorage.getItem("refreshtoken"));

  const handleBoardChange = (e) => {

    const { name, value } = e.target;
    setBoard((current) => {
      return {
        ...current,
        [name]: value
      }
    });
  };

  const handleContentChange = (content) => {
    if (content.trim() === "<p><br></p>") {
      setContent({ content: "" });
    } else {
      setContent({ content: content });
    }
  };


  const fetchData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: 'http://127.0.0.1:5056/post/v1/' + id,
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
        },
      }).then((response) => {
        const postData = response.data.result;
        setBoard({
          title: postData.title,
        });
        setContent({
          content: postData.content,
        });
      });

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateBtnClick = async () => {
    console.log("시작")
    if (board.title.trim() === "") {
      console.log("-----------------1")
      setTitleError(true);
      return;
    } else {
      console.log("-----------------2")
      setTitleError(false);
    }

    if (content.content.trim() === "") {
      console.log("-----------------3")
      setContentError(true);
      return;
    } else {
      console.log(content.content.length)
      console.log("-----------------4")
      setContentError(false);
    }

    try {
      await axios({
        method: "patch",
        url: "http://localhost:5056/post/v1/" + id,
        data: {
          title: board.title,
          content: content.content,
        },
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          alert("게시글이 성공적으로 수정되었습니다.")
          navigate("/freeboard");
        }
      })
    } catch (error) {
      alert("게시글 수정에 실패 하였습니다. 다시 시도해주세요.");
    }
  }

  const handleNavigate = (path) => {
    navigate(`/freeboard/${id}`);
  };

  return (
    <div className="updateBox">
      <div className="title">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="title"
            value={board.title}
            onInput={handleBoardChange}
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
          name="content"
          formats={formats}
          theme="snow"
          value={content.content}
          onChange={handleContentChange}
        />
        {contentError && (
          <p className="error-message">내용 입력은 필수입니다.</p>
        )}
      </div>

      <div className="buttonBox">
        <Button
          variant="outline-light"
          className="rounded-pill updatebutton"
          type="button"
          onClick={handleUpdateBtnClick}
        >
          <strong>수정</strong>
        </Button>
        <Button
          variant="outline-light"
          className="rounded-pill cancelbutton"
          type="button"
          onClick={() => handleNavigate()}
        >
          <strong>취소</strong>
        </Button>
      </div>
    </div>
  );
};

export default FreeBoardUpdate;