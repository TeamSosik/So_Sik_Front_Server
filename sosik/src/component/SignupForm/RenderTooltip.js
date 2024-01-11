import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip } from "react-bootstrap";

const RenderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    <strong>매우 비활동적</strong> - 대부분의 시간을 앉아서 보내고 규칙적인
    운동을 하지 않는 사람
    <br />
    <br />
    <strong>비활동적</strong> - 대부분의 시간을 앉아서 보내지만 쇼핑, 청소와
    같은 가벼운 운동을 규칙적으로 하는 사람
    <br />
    <br />
    <strong>보통</strong> - 대부분의 시간을 앉아서 보내지만 운동을 시간을 정해
    보통의 신체적활동을 하는 사람
    <br />
    <br />
    <strong>활동적</strong> - 일상적으로 꾸준한 운동이나 활동을 통해 신체적
    활동량을 유지하는 사람
    <br />
    <br />
    <strong>매우 활동적</strong> - 매일 정기적으로 고강도 운동이나 체력 단련을
    통해 신체 활동량을 높이는 사람
    <br />
    <br />
  </Tooltip>
);

export default RenderTooltip;
