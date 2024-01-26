import React, { useState, useEffect } from "react";
import axios from "axios";
import "./freeboardlist.css";
import FreeBoardCard from "./FreeBoardCard";
import { Link } from "react-router-dom";
import Loading from "../../common/spinners/Loading";

const FreeBoardList = () => {
  const defaultParams = {
    page:0,
    size:10
  };
  
  const [data, setData] = useState([]); // 렌더링될 데이터
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태
  const [params, setParams] = useState(defaultParams); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 추가 데이터가 있는지 여부

  // 스크롤 위치 감지 함수
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && hasMore) {
      // 스크롤이 하단에 도달하면 새로운 데이터 로드
      setParams((current) => {
        const newParams = {
          ...current,
          page: params.page + 1
        }
        return newParams;
      });
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const getData = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        url: 'http://127.0.0.1:5056/post/v1',
        params: params
      }).then((response) => {
        const resultData = response.data.result.content;
        console.log(resultData);
        setData(prevData => [...prevData, ...resultData]);
        setLoading(false);
        if(response.data.result.last)
          setHasMore(false);
        
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 페이지가 변경되면 새로운 데이터 로드
    getData();
  }, [params]);
  

  return (
    <>
    <div className="freeboard-list">
      {data.map((data) => (
        <Link to={`/freeboard/${data.id}`} key={data.id} style={{ textDecoration: "none"}}>
          <FreeBoardCard content={data} />
        </Link>
      ))}
      
      {loading && <Loading></Loading>}
      
    </div>
    
    </>
  );
};

export default FreeBoardList;