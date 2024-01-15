import React from "react";
import './searchbox.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = () => {

    return (
        <div className="header-search">
            <input type="text" name="header-search" placeholder="궁금하신 음식 정보를 검색해주세요." />
            <button id="header-search-btn" type="button"><FontAwesomeIcon icon={faSearch} size="sm" style={{color: "#ffffff"}} /></button>
        </div>
    );
};

export default SearchBox;
