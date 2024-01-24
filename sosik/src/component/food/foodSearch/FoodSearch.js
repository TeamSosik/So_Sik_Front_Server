import React, { useState, useEffect } from "react";
import axios from "axios";
import KcalContext from "./KcalContext.js";
import { useLocation } from "react-router-dom";
import PageButton from "./PageButton.js";
import "./foodSearch.css";
import notFoodData from "../../../images/foodNoSearch.png";
import Loading from "./../../common/spinners/Loading";

const FoodSearch = () => {
  // 필드

  const defaultPageData = {
    page: 1, // 현재 페이지 번호
    size: 12, // 한 페이지당 게시글 수
    showPages: 5, // 화면에 보일 페이지 개수
    totalNum: 0, // 전체 게시글 수
  };

  const [pageData, setPageData] = useState(() => defaultPageData);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { yourParameter } = location.state || {};

  // 데이터 불러오기
  const getDataByPageBtn = async (e) => {
    const pageNum = e.target.id;

    setPageData((current) => {
      return {
        ...current,
        page: Number(pageNum),
      };
    });

    const params = {
      name: yourParameter,
      page: pageNum,
      size: pageData.size,
    };

    try {
      // 음식 데이터 요청하기
      const response = await axios({
        method: "get",
        url: "/food/v1",
        baseURL: "http://localhost:5056/",
        params: params,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (e) {}
  };

  const handlePageBtnClick = async (e) => {
    const data = await getDataByPageBtn(e);
    console.log(data);
    setDataList(() => data.data.result);

    // page 데이터 입력하기
    setPageData((current) => {
      const newPageData = {
        ...current,
        page: data.data.result.number + 1,
        size: data.data.result.size,
        totalNum: data.data.result.totalElements,
        totalPages: data.data.result.totalPages,
      };
      return newPageData;
    });
  };

  const getDataList = async () => {
    const params = {
      name: yourParameter,
      page: 1,
      size: pageData.size,
    };
    console.log(params);

    try {
      setLoading(true);

      // 음식 데이터 요청하기
      const response = await axios({
        method: "get",
        url: "/food/v1",
        baseURL: "http://localhost:5056/",
        params: params,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPageData((current) => {
        const newPageData = {
          ...current,
          page: 1,
          size: response.data.result.size,
          totalNum: response.data.result.totalElements,
          totalPages: response.data.result.totalPages,
        };
        return newPageData;
      });
      setLoading(false);
      setDataList(response.data.result);
      return response;
    } catch (e) {}
  };

  //가짜 데이터

  useEffect(() => {
    console.log(yourParameter);
    getDataList();
  }, [yourParameter]);

  // 데이터 불러오기

  // // 메서드

  // view
  // 칼로리 리스트
  let kcalContextList = "";
  if (dataList.length !== 0) {
    console.log(dataList);
    kcalContextList = dataList.content.map((data, index) => {
      return <KcalContext key={index} data={data} />;
    });
  }

  // 버튼박스
  // 메서드
  // 음식 상세페이지로 이동한다.

  return (
    <>
      {loading ? (
        <Loading />
      ) : yourParameter !== undefined ? (
        <div className="foodSearchBox">
          {/* contextBox */}
          <div className="kcalContexListBox">
            {/* context */}
            {kcalContextList}

            {/* TODO : div 박스를 나눌 지 생각해봐야 합니다. */}
            {/* ButtonBox */}
            <PageButton
              handlePageBtnClick={handlePageBtnClick}
              pageData={pageData}
            />
          </div>
        </div>
      ) : (
        <img src={notFoodData} className="foodNoSearch" alt="not_data.png" />
      )}
    </>
  );
};

export default FoodSearch;
