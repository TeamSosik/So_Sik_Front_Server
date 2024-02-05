import React from "react";
import notfound from "../../../images/404.png";
import "./Error404.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Link import

const Error404 = () => {
  return (
    <div className="error-container">
      <img src={notfound} alt="404 Not Found" className="center-image" />
     
      <Link to="/">
        <Button
          variant="outline-light"
          className="rounded-pill mainpagebutton"
          type="submit"
        >
          메인페이지로
        </Button>
      </Link>
    </div>
  );
};

export default Error404;