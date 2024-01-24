import React from "react"
import "./freeboardwritebtn.css"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import FreeBoardSearchBox from "./FreeBoardSearchBox";

function FreeWriteBtn() {

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
        <Button
        className="freewrite-btn"
        type="submit"
        onClick={() => handleNavigate("/freeboardwrite")}>
        글 등록
        <FreeBoardSearchBox></FreeBoardSearchBox>
        </Button>
    </div>
  )
}

export default FreeWriteBtn