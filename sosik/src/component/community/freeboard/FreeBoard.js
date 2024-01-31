import React, { useState } from 'react';
import FreeBoardSearchBox from './FreeBoardSearchBox';
import './freeboard.css';
import FreeBoardList from './FreeBoardList';
import FreeBoardWriteBtn from "./FreeBoardWriteBtn";

function FreeBoard() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);

  };
  return (
    <div className='freeboard'>
      <h3>자유게시판</h3>
      <div className='freeboard-header'>
        <FreeBoardWriteBtn />
        <FreeBoardSearchBox onSearch={handleSearch} />
      </div>
      <FreeBoardList searchKeyword={searchKeyword} />
    </div>
  );
}

export default FreeBoard;