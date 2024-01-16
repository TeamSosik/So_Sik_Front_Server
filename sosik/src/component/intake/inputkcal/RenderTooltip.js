import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip } from "react-bootstrap";

const RenderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    <strong>나의 TDEE</strong> - {props.tdeeCalculation} kcal
    <br />
    <br />
    <strong>목표몸무게까지 관리기간</strong> -{" "}
    {props.currentWeight >= props.targetWeight ? (
      <p>
        하루 {props.tdeeCalculation - 500}kcal씩 {props.managementWeek}주
      </p>
    ) : (
      <p>
        하루 {props.tdeeCalculation + 500}kcal씩 {props.managementWeek}주
      </p>
    )}
  </Tooltip>
);

export default RenderTooltip;
