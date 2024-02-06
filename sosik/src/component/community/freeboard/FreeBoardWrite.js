import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./freeBoardwrite.css";

Quill.register("modules/imageResize", ImageResize);

const FreeBoardWrite = () => {
  const toolbarOptions = [
    [
      { header: [1, 2, 3, 4, 5, false] },
      { size: ["small", false, "large", "huge"] },
    ],
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
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const [board, setBoard] = useState({ title: "", content: "" });
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const navigate = useNavigate();

  const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
  const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));

  const handleBoardChange = (e) => {
    const { name, value } = e.target;
    setBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      content: content,
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

    try {
      const response = await axios.post(
        "http://localhost:5056/post/v1",
        {
          title: board.title,
          content: board.content,
        },
        {
          headers: {
            authorization: authorization,
            refreshtoken: refreshToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("게시글이 성공적으로 등록되었습니다.");
        navigate("/freeboard");
      }
    } catch (error) {
      alert("게시글 등록에 실패 하였습니다. 다시 시도해주세요.");
    }
  };

  const handleIntakeFoodClick = async () => {
    try {
      const today = getFormattedDate();
      const response = await axios.get(
        "http://localhost:5056/intake/v1/" + today,
        {
          headers: {
            authorization: authorization,
            refreshToken: refreshToken,
          },
        }
      );

      const serverData = response.data.result;
      console.log(response.data.result);

      let isMorningRendered = false;
      let isLunchRendered = false;
      let isDinnerRendered = false;
      let isSnacksRendered = false;
      let totalKcal = 0;

      serverData.sort((a, b) => {
        const order = ["BREAKFAST", "LUNCH", "DINNER", "SNACKS"];
        return order.indexOf(a.category) - order.indexOf(b.category);
      });

      if (Array.isArray(serverData)) {
        const tableRows = serverData.map((item, index) => {
          let categoryTag = "";

          switch (item.category) {
            case "BREAKFAST":
              if (!isMorningRendered) {
                isMorningRendered = true;
                categoryTag = "<br/><div><strong ><아침></strong></div>";
              }
              break;
            case "LUNCH":
              if (!isLunchRendered) {
                isLunchRendered = true;
                categoryTag = "<br/><div><strong><점심></strong></div>";
              }
              break;
            case "DINNER":
              if (!isDinnerRendered) {
                isDinnerRendered = true;
                categoryTag = "<br/><div><strong><저녁></strong></div>";
              }
              break;
            case "SNACKS":
              if (!isSnacksRendered) {
                isSnacksRendered = true;
                categoryTag = "<br/><div><strong><간식></strong></div>";
              }
              break;
            default:
              return null;
          }
          totalKcal += item.calculationKcal;
          const last =
            index !== serverData.length - 1
              ? ""
              : `<br/><div style="text-align: left;"><h2>[총 칼로리] ${Math.round(
                  totalKcal
                )}Kcal</h></div>`;

          return `
            ${categoryTag}
            <li key=${item.id}>
              <strong>${item.name}</strong> -
              <span>${item.foodAmount}g(ml)</span> /
              <span>${item.calculationKcal}Kcal</span>
            </li>${last}`;
        });

        const todayMenu =
          '<div style="text-align: left;"><h2>[오늘의 식단]</h2></div>';

        setBoard((prevBoard) => ({
          ...prevBoard,
          content: todayMenu + tableRows.join("") + prevBoard.content,
        }));
        console.log(board.content);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const IntakeBtnBoxView = (
    <div className="intake-btn-box" onClick={handleIntakeFoodClick}>
      <div className="intake-btn">섭취음식</div>
      <div className="intake-btn">불러오기</div>
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
