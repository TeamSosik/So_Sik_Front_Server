import { useRef, useState } from "react";
import "./FoodModal.css";

import { Button, Form, InputGroup, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
const FoodModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const [inputValue, setInputValue] = useState("");

  // 인풋 값이 변경될 때 호출되는 함수
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // 폼 제출 시 호출되는 함수 (예: 제출 버튼을 눌렀을 때)
  const handleSubmit = (event) => {
    event.preventDefault();
    // 입력된 값을 사용하거나 다른 작업 수행
    console.log("입력된 값:", inputValue);
  };
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
  
    return (
      <>
        <div className={'btn-wrapper'}>
          <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
            모달 열기
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
              {" "}
              * 모든 음식은 100g/ 100ml 기준입니다.{" "}
            </span>
            <InputGroup className="mb-3">
              <Form.Control placeholder="음식을 검색해주세요" />
              <Button variant="outline-secondary" id="button-addon2">
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
                  <th style={{ width: "25%", textAlign: "center" }}>kcal</th>
                  <th style={{ width: "10%", textAlign: "center" }}> carbo</th>
                  <th style={{ width: "10%", textAlign: "center" }}> fat</th>
                  <th style={{ width: "10%", textAlign: "center" }}>
                    {" "}
                    protein
                  </th>
                  <th style={{ width: "10%", textAlign: "center" }}> g/ml</th>
                </tr>
              </thead>

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
              </tbody>
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
      )}
    </>
  );
};

export default FoodModal;
