import React, { useState, useEffect } from "react";
import axios from "axios";
import "./freeboardlist.css";
import FreeBoardCard from "./FreeBoardCard";
import { Link } from "react-router-dom";
import Loading from "../../common/spinners/Loading";

const FreeBoardList = ({ searchKeyword }) => {
  const defaultParams = {
    page: 0,
    size: 10,
    searchKeyword: searchKeyword 
  };
  
  const [data, setData] = useState([]); // 렌더링될 데이터
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태
  const [params, setParams] = useState(defaultParams); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 추가 데이터가 있는지 여부
  
  // 스크롤 위치 감지 함수
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentEledment.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && hasMore) {
      // 스크롤이 하단에 도달하면 새로운 데이터 로드
      setParams((current) => {
        const newParams = {
          ...current,
          page: params.page + 1
        };
        return newParams;
      });
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const getData = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        url: 'http://43.200.224.252:5056/post/v1',
        params: params
      }).then((response) => {
        const resultData = response.data.result.content;
        // 검색 결과가 있는 경우
        if (params.page === 0) {
          setData(resultData);
        } else {
        // 검색 결과가 없는 경우
          setData(prevData => [...prevData, ...resultData]);
        }
        setLoading(false);
        if (response.data.result.last)
          setHasMore(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setParams((current) => ({
      ...current,
      searchKeyword: searchKeyword,
      page: 0, 
    }));
  }, [searchKeyword]);

  useEffect(() => {
    getData();
  }, [params]);


  return (
    <>
      <div className="freeboard-list">
        {data.map((data) => (
          <Link to={`/freeboard/${data.id}`} style={{ textDecoration: "none" }}>
            <FreeBoardCard content={data} />
          </Link>
        ))}

        {loading && <Loading></Loading>}

      </div>

    </>
  );
};

export default FreeBoardList;