import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip } from "react-bootstrap";

const RenderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    <br />
    <strong>
      {" "}
      * 마지막으로 기록한 체중은 회원정보 수정에서 수정이 가능합니다
    </strong>
    <br />
    <br />
  </Tooltip>
);

export default RenderTooltip;
