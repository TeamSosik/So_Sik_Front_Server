import React from "react";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./inputkcal.css";

function Inputkcalimg() {
  return (
    <div className="kcalimgdiv">
      <Image src="img/salad.jpg" fluid className="kcalimg" />
    </div>
  );
}

export default Inputkcalimg;
