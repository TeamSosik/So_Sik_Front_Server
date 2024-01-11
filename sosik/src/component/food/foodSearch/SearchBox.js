import React, { useEffect } from "react";
import SearchReadingGlassesImage from "../../../images/search_reading_glasses.png";

const SearchBox = () => {
  // 메서드
  /**
   * 기능 : 클릭하면 input의 placeholder가 사라집니다.
   */
  const clickSearchValueBoxHandle = (e) => {
    // searchValueBox 불러오기
    const searchValueBox = e.target;
    // placeholder 삭제하기
    searchValueBox.placeholder = "";
  };

  /**
   * 기능 : input을 벗어나서 값이 없으면 placeholder가 나타납니다.
   */
  const blurSearchValueBoxHandle = (e) => {
    // searchValueBox 불러오기
    const searchValueBox = e.target;
    // placeholder 삭제하기
    searchValueBox.placeholder = "음식 검색";
  };

  /**
   * 기능 : input 테이블 click 이벤트
   */
  const creaetEventForInput = () => {
    const searchValue = document.querySelector(
      ".searchValueBox > input[type='text']"
    );

    searchValue.addEventListener("click", clickSearchValueBoxHandle);
    searchValue.addEventListener("blur", blurSearchValueBoxHandle);
  };

  useEffect(() => {
    // input 테이블 click 이벤트
    creaetEventForInput();
  }, []);

  return (
    <div className="searchBox">
      {/* searchAllBox */}
      <div className="searchAllBox">
        {/* searchValueBox */}
        <div className="searchValueBox">
          <input
            type="text"
            placeholder="음식 검색"
            onClick={clickSearchValueBoxHandle}
          />
        </div>
        {/* searchImage */}
        <div className="searchImageBox">
          <img alt="검색_돋보기_이미지" src={SearchReadingGlassesImage} />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
