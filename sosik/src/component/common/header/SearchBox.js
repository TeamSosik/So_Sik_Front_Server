import React, { useEffect, useState } from "react";
import "./searchbox.css";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = () => {  
  const [wholeTextArray,setWholeTextArray] = useState([""])
  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownList, setDropDownList] = useState(wholeTextArray)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)

  const navigate = useNavigate();
  
  const clickDropDownItem = (clickedItem) => {
    setInputValue(() => clickedItem);
    setIsHaveInputValue(() => false);
    navigate("/foodsearch", { state: { yourParameter: clickedItem } }); //리다이렉트
  };
  
  const handleSearch = () => {
    console.log(inputValue);
    navigate("/foodsearch", { state: { yourParameter: inputValue } });
  };

  const handleDocumentClick = e => {
    if (!e.target.closest('.dropdown-container')) {
      setIsHaveInputValue(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const changeInputValue = event => {
    setInputValue(() => event.target.value)

    const params = {
      inputValue: event.target.value,
    };

    try {
      axios({
        url: 'http://43.200.224.252:5056/food/v1/search', 
        params: params
      })
      .then(function (res) {

        if (res.data === null){
          return 
        }
        else{
          setDropDownList(()=>{
            const array = res.data.result
            return array.map((data) => {
              return  data.name
            })
          })
        }
      })
    } catch (error) {
      console.error("가입에 실패하였습니다. 잠시 후 다시 시도해주세요", error); // 오류 처리
    }
    setIsHaveInputValue(() => true);
  };

  const showDropDownList = () => {
    if (inputValue === "") {
      setIsHaveInputValue(() => false);
      setDropDownList(() => []);
    } else {
      const choosenTextList = wholeTextArray.filter((textItem) =>
        textItem.includes(inputValue)
      );
      setDropDownList(() => choosenTextList);
    }
  };

  const handleDropDownKey = (event) => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(() => dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(() => dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(() => -1);
      }
    }
  };

  const handleKeyDown = (event) => {
    // 엔터 키의 키 코드는 13입니다.
    if (event.key === "Enter") {
      console.log(inputValue);
      navigate("/foodsearch", { state: { yourParameter: inputValue } }); //리다이렉트
      setIsHaveInputValue(false);

    }
  };

  useEffect(showDropDownList, [inputValue]);

  return (
    <WholeBox className="header-search">
      <InputBox isHaveInputValue={isHaveInputValue}>
        <Input
          type="text"
          name="header-search"
          value={inputValue}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
          onKeyDown={handleKeyDown}
          placeholder="궁금한 음식 정보를 검색해주세요."
        />
        <button id="header-search-btn" type="button" onClick={handleSearch} ><FontAwesomeIcon icon={faSearch} size="sm" style={{color: "#ffffff"}} /></button>
      </InputBox>

      {isHaveInputValue && (
        <DropDownBox>
          {dropDownList.length === 0 && (
            <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
          )}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <DropDownItem
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={
                  dropDownItemIndex === dropDownIndex ? "selected" : ""
                }
              >
                {dropDownItem}
              </DropDownItem>
            );
          })}
        </DropDownBox>
      )}
    </WholeBox>
  );
};

const activeBorderRadius = "16px 16px 0 0";
const inactiveBorderRadius = "16px 16px 16px 16px";

const WholeBox = styled.div`
  padding: 10px;
`;

const InputBox = styled.div`
  position: absolute;
  width: 44.39rem;
  display: flex;
  flex-direction: row;
  padding: 16px;
  border-radius: ${(props) =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;
`;

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

const DropDownBox = styled.ul`
  padding-bottom: 10px;
  position: absolute;
  margin-left: 1rem;
  width: 35.8rem;
  top: 40px;
  display: block;
  padding-top: 30px;
  background-color: #F5F5F5;
  border-top: none;
  border-radius: 0 0 16px 16px;
  list-style-type: none;
  z-index: 2;
  padding-left: 0;
`;

const DropDownItem = styled.li`
  padding: 0 23px;
  &:hover{
    cursor: pointer;
  }
  &.selected {
    background-color: lightgray;
  }
`;

export default SearchBox;
