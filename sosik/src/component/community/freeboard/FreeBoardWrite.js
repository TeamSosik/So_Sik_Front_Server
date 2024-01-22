import React, { useState } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import './freeBoardwrite.css';
import { Button, Form } from 'react-bootstrap';
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';

const FreeBoardWrite = () => {

  // 필드

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
    title: '',
  }

  // 상태
  const [board, setBoard] = useState(defaultBoard);
  const [content, setContent] = useState(defaultBoard);

  // 메서드
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

  // ReactQuill의 content가 변할 때 작동합니다.
  const handleContentChange = (content) => {

    console.log("content : ", content);

    return setContent(() => {
      return content;
    });
  };

  // 작성 버튼 클릭 시 작동합니다.
  const handleCreateBoardClick = () => {

    console.log("등록 시작");

    const data = {
      title: board.title,
      content: content
    }

    console.log(data);

    // axios 처리 시작

    // axios 처리 끝

    console.log("등록 끝");


  }

  // view


  return (
    <div className='writeBox'>
      
      <div className='title'>
      <Form.Group className="mb-3">
        {/* <Form.Label className="formlabel">제목</Form.Label> */}
        <Form.Control type="text" name='title' placeholder="제목을 입력해주세요" onChange={handleBoardChange} />
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
          placeholder='내용을 입력해주세요.'
        />
      </div>

      <div className='buttonBox'>
       <Button
          variant="outline-light"
          className="rounded-pill writebutton"
          type="button"
          onClick={handleCreateBoardClick}
        >
          <strong>작성</strong>
        </Button>
      </div>
    </div>
  );
};

export default FreeBoardWrite;