import React from "react";

const CallengeContentBox = ({ title, info, count, remainingWeight }) => {
  return (
    <div className="challengeBox">
      <div className="titleBox">
        <span>{title}</span>
      </div>
      <div className="infoBox">
        <span>{info}</span>
        {count !== undefined ? (
          <span className="countName">({count}명)</span>
        ) : (
          <span className="kgName">kg</span>
        )}
        {remainingWeight === undefined ? null : (
          <div className="remainingBox">
            <span>남은양: {remainingWeight}</span>
            <span className="kgName">kg</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallengeContentBox;
