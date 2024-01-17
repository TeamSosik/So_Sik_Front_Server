import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip } from "react-bootstrap";

const RenderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    <br />
    <strong>TDEE란</strong> - TDEE(Total Daily Energy Expenditure)는 하루 동안
    소비되는 총 에너지 양으로, BMR(기초대사량)에 TEF(음식 열 효과)와 AT(활동 열
    효과)를 더한 값이다. <br />
    <strong>즉, 지금 체중을 유지하는데 하루에 필요한 칼로리이다.</strong>
    <br />
    <br />
  </Tooltip>
);

export default RenderTooltip;
