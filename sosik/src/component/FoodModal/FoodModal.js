import { useRef, useState } from "react";
import "./FoodModal.css";
import FoodResult from "./FoodResult";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const FoodModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const foodResult = [
        {
            foodname: '사과잼 파이',
            kcal:254.3, 
            carbo:70,
            fat: 10,
            protein:20
    
        },
        {
            foodname: "Minu",
            kcal:254.3, 
            carbo:70,
            fat: 10,
            protein:20
        },
        {
            foodname: "Minu",
            kcal:254.3, 
            carbo:70,
            fat: 10,
            protein:20
        },
        {
            foodname: "Minu",
            kcal:254.3, 
            carbo:70,
            fat: 10,
            protein:20
        }
      
      ]

    const foodSearchResult =  foodResult.map((a,b) => {
        return <FoodResult key={b} foodname={a.foodname} kcal={a.kcal} carbo={a.carbo} fat={a.fat} protein={a.protein}></FoodResult>
         
       })
  
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
          }}>
            <div className={'modal-content'}>
              <p>음식 검색</p>
              <InputGroup className="mb-3">
                <Form.Control
                placeholder="음식을 검색해주세요"/>
                <Button variant="outline-secondary" id="button-addon2">
                    <FontAwesomeIcon icon={faMagnifyingGlass}  />
                    
                </Button>
                </InputGroup>
        

              <button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
                모달 닫기
              </button>

            <table >
                <thead>
                    <tr style={{marginLeft:'50px'}}> 
                        <th style={{ width: '30%', textAlign: 'center' }}> 음식</th>
                        <th style={{ width: '30%', textAlign: 'center' }}>kcal</th>
                        <th style={{ width: '10%', textAlign: 'center' }}> carbo</th>
                        <th style={{ width: '10%', textAlign: 'center' }}> fat</th>
                        <th style={{ width: '10%', textAlign: 'center' }}> protein</th>
                    </tr>
                </thead>

                <tbody>
                    <td style={{ width: '30%', textAlign: 'center' }}>사과잼파이</td>
                    <td style={{ width: '30%', textAlign: 'center' }}>300.1</td>       
                    <td style={{ width: '10%', textAlign: 'center' }}>30</td>
                    <td style={{ width: '10%', textAlign: 'center' }}>50</td>
                    <td style={{ width: '10%', textAlign: 'center' }}>10</td>
                </tbody>
            </table>

            
            
            


               
            </div>

         </div>          
        }
        
      </>
    );
  };
  
  export default FoodModal;