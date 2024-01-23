import React from 'react'
import FreeBoardSearchBox from './FreeBoardSearchBox'
import './freeboard.css'
import FreeBoardList from './FreeBoardList';


function FreeBoard() {
    return (
        <div className='freeboard'>
            <h3>자유게시판</h3>
            <div className='freeboard-header'>
            <FreeBoardSearchBox></FreeBoardSearchBox>
            </div>
            <FreeBoardList></FreeBoardList>
        </div>
    )
}

export default FreeBoard