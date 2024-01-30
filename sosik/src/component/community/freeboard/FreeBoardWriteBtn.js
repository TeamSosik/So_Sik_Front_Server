import React, { useState } from "react";
import "./freeboardwritebtn.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FreeWriteBtn() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!window.sessionStorage.getItem("accesstoken"));

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      {isLoggedIn && (
        <Button
          className="freewrite-btn"
          type="submit"
          onClick={() => handleNavigate("/freeboardwrite")}
        >
          글 등록
        </Button>
      )}
    </div>
  );
}

export default FreeWriteBtn