import { useRef, useState } from "react";
import "./foodModal.css";

import { Button, Form, InputGroup, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Tbody from "./Tbody";
import PageButton from "./PageButton";
import Loading from "../../common/spinners/Loading";

const FoodModal = ({modalBtn}) => {

  // 필드
  const foodResult = [
    {
      foodname: "사과잼 파이",
      kcal: 254.3,
      carbo: 70,
      fat: 10,
      protein: 20,
    },
    {
      foodname: "Minu",
      kcal: 254.3,
      carbo: 70,
      fat: 10,
      protein: 20,
    },
    {
      foodname: "Minu",
      kcal: 254.3,
      carbo: 70,
      fat: 10,
      protein: 20,
    },
    {
      foodname: "Minu",
      kcal: 254.3,
      carbo: 70,
      fat: 10,
      protein: 20,
    },
  ];

  const modalBackground = useRef();

  const defaultPageData = {
    page: 1,// 현재 페이지 번호
    size: 10,// 한 페이지당 게시글 수
    showPages: 5,// 화면에 보일 페이지 개수
    totalNum: 0// 전체 게시글 수
  }
  
  // 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dataList, setDataList] = useState([]);
  const [pageData, setPageData] = useState(() => defaultPageData);
  const [loading, setLoading] = useState(false);

  console.log("inputValue : ", inputValue);

  // 메서드
  const handleDataListChange = (value) => {
    setDataList(value);
  }

  // 인풋 값이 변경될 때 호출되는 함수
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  

  // 폼 제출 시 호출되는 함수 (예: 제출 버튼을 눌렀을 때)
  const handleSubmit = async (event) => {
    event.preventDefault();
    // 입력된 값을 사용하거나 다른 작업 수행
    console.log("입력된 값:", inputValue);

    // 음식 서비스에 요청하기
    const data = await getDataList();

    console.log(data);

    // 데이터 뿌려주기
    setDataList(() => {return data.data.result.content});
    // page 데이터 입력하기
    setPageData((current) => {
      const newPageData = {
        ...current,
        page: 1,
        size: data.data.result.size,
        totalNum: data.data.result.totalElements,
        totalPages: data.data.result.totalPages
      }
      return newPageData;
    });

  };

  const handleModalTogle = (value) => {
    setModalOpen(value);
  }

  console.log(dataList);


  // const foodSearchResult = foodResult.map((a, b) => {
  //   return (
  //     // <FoodResult
  //     //   key={b}
  //     //   foodname={a.foodname}
  //     //   kcal={a.kcal}
  //     //   carbo={a.carbo}
  //     //   fat={a.fat}
  //     //   protein={a.protein}
  //     // ></FoodResult>
  //   );
  // });

    // const foodSearchResult =  foodResult.map((a,b) => {
    //     return <FoodResult key={b} foodname={a.foodname} kcal={a.kcal} carbo={a.carbo} fat={a.fat} protein={a.protein}></FoodResult>
         
    //    })

  // view
  let tbodys = "";

  if(dataList.length !== 0) {
    tbodys = dataList.map((data, index) => {
      return <Tbody key={index} data={data} handleModalTogle={handleModalTogle} handleDataListChange={handleDataListChange}  />
    });
  }

  // 데이터 불러오기
  const getDataList = async () => {

    const params = {
      name: inputValue,
      page: pageData.page,
      size: pageData.size
    }

    try {

      setLoading(true);

      // 음식 데이터 요청하기
      const response = await axios({
        method: "get",
        url: "/food/v1",
        baseURL: "http://localhost:5056/",
        params: params,
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("************** 데이터 왔다 시작 ***************");
      console.log(response);
      console.log("************** 데이터 왔다 끝 ***************");

      setLoading(false);

      return response;
    } catch(e) {
      console.log("********** 에러 발생 *************");
      console.log(e);
    }
  }

  // 페이지 버튼 클릭
  const handlePageBtnClick = async (e) => {

    console.log(e.target.id);

    const data = await getDataByPageBtn(e);

    console.log(data);

    setDataList(() => data.data.result.content);

    // page 데이터 입력하기
    setPageData((current) => {
      const newPageData = {
        ...current,
        page: data.data.result.number + 1,
        size: data.data.result.size,
        totalNum: data.data.result.totalElements,
        totalPages: data.data.result.totalPages
      }
      return newPageData;
    });


  }

  // 데이터 불러오기
  const getDataByPageBtn = async (e) => {

    const pageNum = e.target.id;

    setPageData((current) => {
      return {
        ...current,
        page: Number(pageNum)
      }
    });

    const params = {
      name: inputValue,
      page: pageNum,
      size: pageData.size
    }

    try {
      // 음식 데이터 요청하기
      const response = await axios({
        method: "get",
        url: "/food/v1",
        baseURL: "http://localhost:5056/",
        params: params,
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("************** 데이터 왔다 시작 ***************");
      console.log(response);
      console.log("************** 데이터 왔다 끝 ***************");
      return response;

    } catch(e) {
      console.log("********** 에러 발생 *************");
      console.log(e);
    }
  }

  
  return (
    <>
      <div className={'btn-wrapper'}>
        <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
          {modalBtn}
        </button>
      </div>
      {
        modalOpen &&
        <div className={'modal-container'} ref={modalBackground} onClick={e => {

            if (e.target === modalBackground.current) {
              setModalOpen(false);
              setDataList([]);
            }
          }}
        >
          <div className={"modal-content"}>
            <p>음식 검색</p>
            
            <span style={{ fontSize: "14px" }}>
              * 모든 음식은 100g/ 100ml 기준입니다.
            </span>
            <InputGroup className="mb-3">
              <Form.Control placeholder="음식을 검색해주세요" onChange={handleInputChange} />
              <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit} >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </InputGroup>

            <button
              className={"modal-close-btn"}
              onClick={() => setModalOpen(false)}
            >
              모달 닫기
            </button>

            {
              loading ? <Loading />

              :

              dataList.length !== 0 ?
                <>
                  <table>
                    <thead>
                      <tr style={{ marginLeft: "50px" }}>
                        <th style={{ width: "25%", textAlign: "center" }}> 음식</th>
                        <th style={{ width: "10%", textAlign: "center" }}> 탄수화물</th>
                        <th style={{ width: "10%", textAlign: "center" }}> 단백질</th>
                        <th style={{ width: "10%", textAlign: "center" }}> 지방</th>
                        <th style={{ width: "25%", textAlign: "center" }}> 칼로리</th>
                        <th style={{ width: "10%", textAlign: "center" }}> g/ml</th>
                      </tr>
                    </thead>

                    {/* ********** 검색 데이터 뿌려주기 시작 ********** */}

                    {tbodys}

                    {/* ********** 검색 데이터 뿌려주기 끝 ********** */}

                  </table>

                  {/* 페이지 번호 시작 */}
                  <PageButton handlePageBtnClick={handlePageBtnClick} pageData={pageData} />
                  {/* 페이지 번호 끝 */}
                </>
                : 
                <div>
                  데이터가 없습니다.
                </div>
            }
          </div>
        </div>
      }
    </>
  );
};

export default FoodModal;
