import React from 'react';
import { Pagination } from 'react-bootstrap';

const PageButton = ({handlePageBtnClick, pageData}) => {

  // 필드

  // 상태

  // 메서드

  // view

  const getPageButton = () => {

    const bound = pageData.size;// 한 페이지당 게시글 수
    const pageNum = pageData.page;// 현재 페이지 번호
    const totalNum = pageData.totalNum;// 전체 게시글 수
    const lastPageNum = pageData.totalPages;// 마지막 페이지

    console.log(pageData);
    
    /// 필요한 변수 모음
    // const lastPageNum = Math.ceil(totalNum / bound);// 마지막 페이지
    const showPages = pageData.showPages;// 화면에 보일 페이지 개수
    const nowPageSite = Math.ceil(pageNum / showPages);// 현재 페이지의 위치
    const lastPageSite = Math.ceil(lastPageNum / showPages) // 마지막 페이지의 위치 // >> 만들 때 필요할 듯
    const nowPage = pageNum;// 현재 페이지

    console.log(lastPageNum);
    console.log(showPages);
    console.log(nowPageSite);
    console.log(lastPageSite);
    console.log(nowPage);
    
    /// view에 보일 페이지 번호
    let result = [];
    
    // << 만들기
    // lastPageSite가 1보다 클 때 << 존재한다.
    if(nowPageSite > 1) {
      result.push(<button id={(nowPageSite - 1) * showPages} onClick={handlePageBtnClick} >{"<<"}</button>);
    }
    
    // 마지막페이지가 1일 때 페이지번호가 끝난다.
    if(lastPageNum == 1) {
      result.push(<button className="nowPageBtn" id={lastPageNum} onClick={handlePageBtnClick} >{lastPageNum}</button>);
      return;
    }
    
    // 첫페이지보다 클 때 > 존재한다.
    if(pageNum > 1) {
      result.push(<button id={nowPage - 1} onClick={handlePageBtnClick} >{"<"}</button>);
    }

    // 화면에 페이지를 보여준다.
    for(let i = 1; i <= showPages; i++ ) {
      
      // 현재 페이지가 마지막 페이지면 페이지 생성을 멈춘다.
      if((nowPageSite - 1) * showPages + i === lastPageNum) {
        result.push(<button id={(nowPageSite - 1) * showPages + i} onClick={handlePageBtnClick}>{(nowPageSite - 1) * showPages + i}</button>);
        break;
      }
      
      // 현재 페이지이면 class=nowPageBtn
      if((nowPageSite - 1) * showPages + i === nowPage) {
        result.push(<button className="nowPageBtn" disabled>{(nowPageSite - 1) * showPages + i}</button>);
        continue;
      }
      
      result.push(<button id={(nowPageSite - 1) * showPages + i} onClick={handlePageBtnClick} >{(nowPageSite - 1) * showPages + i}</button>);
      
    }
    
    // 마지막 페이지보다 현재 페이지가 작을 때 > 존재한다.
    if(pageNum < lastPageNum) {
      result.push(<button id={nowPage + 1} onClick={handlePageBtnClick} >{">"}</button>);
    }
    
    // >> 만들기
    // nowPageSite가 lastPageSite보다 작을 때 >> 존재한다.
    if(nowPageSite < lastPageSite) {
      result.push(<button id={nowPageSite * showPages + 1} onClick={handlePageBtnClick} >{">>"}</button>);
    }
    
    return result;
  }


  console.log("hihi");


  return (
    <div className="pageButtonBox">
      <div className="pageButtonList">
          {getPageButton()}
        </div>
    </div>
  );
};

export default PageButton;