import React from 'react'
import FreeBoardSearchBox from './FreeBoardSearchBox'
import './freeboard.css'
import FreeBoardList from './FreeBoardList';


function FreeBoard() {
    return (
        <div>
            <h3>자유게시판</h3>
            <FreeBoardSearchBox></FreeBoardSearchBox>
            <FreeBoardList></FreeBoardList>
        </div>
    )
}

export default FreeBoard