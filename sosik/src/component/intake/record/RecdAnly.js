import React from "react";
import RecdButton from "./RecdButton";
import "./recdAnly.css";
import RecdAnly_section1 from "./RecdAnly_section1";
import RecdAnly_section2 from "./RecdAnly_section2";
import RecdAnly_section3 from "./RecdAnly_section3";

const RecdAnly = () => {
  return (
    <div>
      <RecdButton defaultRadioValue={"2"} />
      <RecdAnly_section1 />
      <div className="position">
        <RecdAnly_section2 />
        <RecdAnly_section3 />
      </div>
    </div>
  );
};

export default RecdAnly;
