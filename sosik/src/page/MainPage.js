import React from "react";
import Section3 from "../component/intake/Inputkcal";
import Section1 from "../component/common/homebanner/Banner";

function Mainpage({ props }) {
  return (
    <div>
      <Section1></Section1>
      <Section3 props={props}></Section3>
    </div>
  );
}

export default Mainpage;
