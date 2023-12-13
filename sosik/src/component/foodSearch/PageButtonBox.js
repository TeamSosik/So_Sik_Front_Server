import React from "react";

/**
 * TODO : 데이터를 받아오면 따로 버튼 생성이 필요합니다.
 *        -> <, > 도 backend와 연동시 삭제해야 합니다.
 * @returns
 */
const PageButtonBox = () => {
  // view
  const buttonList = [1, 2, 3, 4, 5];

  // view
  const view = buttonList.map((data, index) => {
    return <input key={index} type="button" value={data} />;
  });

  return (
    <div className="pageButtonBox">
      <div className="pageButtonList">
        <input type="button" value={"<"} />
        {view}
        <input type="button" value={">"} />
      </div>
    </div>
  );
};

export default PageButtonBox;
