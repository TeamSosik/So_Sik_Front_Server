import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "./freeboardupdate.css";
import { Button, Form } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
  const defaultContent = {
    content: "",
  }

  const { id } = useParams();
  const [board, setBoard] = useState(defaultBoard);
  const [content, setContent] = useState(defaultContent);
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

  // ReactQuill의 content가 변할 때 작동합니다.
  const handleContentChange = (content) => {
    setContent({ content: content });
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
    const confirmUpdate = window.confirm("게시글을 수정하시겠습니까?");
    if (confirmUpdate) {
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
            navigate("/freeboard");
          } else {
            alert("게시글 수정에 실패하였습니다.");
          }
        })
      } catch (error) {
        console.error(error);
      }
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
            defaultValue={board.title}
            onChange={handleBoardChange}
          />
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