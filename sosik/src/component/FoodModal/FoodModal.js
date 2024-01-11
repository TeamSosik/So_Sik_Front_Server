import { useEffect, useRef, useState } from "react";
import "./FoodModal.css";

// import FoodResult from "./FoodResult";
import { Button, Form, InputGroup, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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
  
  // 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dataList, setDataList] = useState([]);
  const [foodAmount, setFoodAmount] = useState("");


  console.log("inputValue : ", inputValue);

  // 메서드

  // 인풋 값이 변경될 때 호출되는 함수
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // 섭취량이 변경되면 호출된다.
  const handleFoodAmountChange = (e) => {
    const value = e.traget.value;
    setFoodAmount(() => {
      return value;
    });
  }

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

  };

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
  let tbodys = "검색을 해주세요!";

  const Tbody = ({data}) => {
    
    return (
      <tbody>
        <td style={{ width: "25%", textAlign: "center" }}>
          {data.name}
        </td>
        <td style={{ width: "25%", textAlign: "center" }}>
          {data.carbo}
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          {data.protein}
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          {data.fat}
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          {data.kcal}
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          <input
            type="text"
            value={foodAmount}
            onChange={handleInputChange}
            placeholder=""
            style={{ width: "50px" }}
          />
        </td>
        <td style={{ width: "10%", textAlign: "center" }}>
          <FontAwesomeIcon icon={faPlus} />
        </td>
      </tbody>
    );
  };

  if(dataList.length !== 0) {
    tbodys = dataList.map((data, index) => {
      return <Tbody key={index} data={data} />
    });
  }

  // 데이터 불러오기
  const getDataList = async () => {

    const params = {
      name: inputValue,
      page: 1,
      size: 10
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

              {/* <tbody>
                <td style={{ width: "25%", textAlign: "center" }}>
                  사과잼파이
                </td>
                <td style={{ width: "25%", textAlign: "center" }}>300.1</td>
                <td style={{ width: "10%", textAlign: "center" }}>30</td>
                <td style={{ width: "10%", textAlign: "center" }}>50</td>
                <td style={{ width: "10%", textAlign: "center" }}>10</td>
                <td style={{ width: "10%", textAlign: "center" }}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder=""
                    style={{ width: "50px" }}
                  />
                </td>
                <td style={{ width: "10%", textAlign: "center" }}>
                  <FontAwesomeIcon icon={faPlus} />
                </td>
              </tbody>

              <tbody>
                <td style={{ width: "25%", textAlign: "center" }}>
                  사과잼파이
                </td>
                <td style={{ width: "25%", textAlign: "center" }}>300.1</td>
                <td style={{ width: "10%", textAlign: "center" }}>30</td>
                <td style={{ width: "10%", textAlign: "center" }}>50</td>
                <td style={{ width: "10%", textAlign: "center" }}>10</td>
                <td style={{ width: "10%", textAlign: "center" }}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder=""
                    style={{ width: "50px" }}
                  />
                </td>
                <td style={{ width: "10%", textAlign: "center" }}>
                  <FontAwesomeIcon icon={faPlus} />
                </td>
              </tbody> */}
              <Pagination
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item disabled>{13}</Pagination.Item>
                <Pagination.Item>{14}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </table>
          </div>
        </div>
      }
    </>
  );
};

export default FoodModal;
