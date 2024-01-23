import React, { useState } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import './freeboardupdate.css';
import { Button, Form } from 'react-bootstrap';
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import { useNavigate } from 'react-router';

const FreeBoardUpdate = () => {

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

  const navigation = useNavigate();

  // 상태
  const [board, setBoard] = useState(defaultBoard);
  const [content, setContent] = useState('');
  

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

    return setContent(() => {
      return content;
    });
  };

  // 수정 버튼 클릭 시 작동합니다.
  const handleUpdateBtnClick = () => {

    console.log("수정 시작");

    const data = {
      title: board.title,
      content: content
    }

    console.log(data);

    // axios 처리 시작

    // axios 처리 끝

    console.log("수정 끝");
  }

  const handleCancelBtnClick = () => {

    navigation("/freeboard");
  }

  // view


  return (
    <div className='updateBox'>
      
      <div className='title'>
      <Form.Group className="mb-3">
        {/* <Form.Label className="formlabel">제목</Form.Label> */}
        <Form.Control 
          type="text" 
          name='title' 
          placeholder="제목을 입력해주세요"
          defaultValue={board.title}
          onChange={handleBoardChange} 
        />
      </Form.Group>
      </div>

      <div className="content">
        <ReactQuill
          style={{height: "600px"}}
          modules={modules}
          formats={formats}
          theme="snow"
          value={content}
          onChange={handleContentChange}
          placeholder='내용을 입력해주세요.'
        />
      </div>

      <div className='buttonBox'>
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
          onClick={handleCancelBtnClick}
        >
          <strong>취소</strong>
        </Button>
      </div>
    </div>
  );
};

export default FreeBoardUpdate;