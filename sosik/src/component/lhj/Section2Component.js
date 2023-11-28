import React from "react";

// import { BiChevronRight } from "react-icons/bi"; react 아이콘 라이브러리 다운 받으면 쓰기

const Section2Component = ({ data }) => {
  // TODO : 같이 공부하기 -> 구조분해 할당
  const {
    alt,
    image,
    content: { c1: content1, c2: content2 },
    url,
  } = data;

  // const navigate = useNavigate();

  // /**
  //  * 기능 : 이동할 수 있습니다.
  //  *  TODO : Route 등록하면 사용하기
  //  */
  // const goAtUrl = (url) => {
  //   navigate(url);
  // };

  return (
    <div className="Section2Component">
      {/* 이미지 box */}
      <div className="imageBox">
        <img alt={alt} src={image} />
      </div>
      {/* content box */}
      <div className="contentBox">
        {/* 위 box */}
        <div className="content1">{content1}</div>
        {/* 아래 box */}
        <div className="content2">{content2}</div>
      </div>
      {/* button box */}
      <a href={url}>
        <div
          className="buttonBox"
          // onClick={() => {
          //   goAtUrl(url);
          // }}
        >
          &gt;
        </div>
      </a>
    </div>
  );
};

export default Section2Component;
