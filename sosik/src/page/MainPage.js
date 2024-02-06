import React from "react";
import { Link } from "react-router-dom";
import './mainpage.css'
import foodsearch from "../images/foodsearch.png";
import community from "../images/community.png";
// <a href="https://kr.freepik.com/free-vector/group-of-young-people-posing-for-a-photo_5230711.htm#&position=35&from_view=author&uuid=bab30dab-0dcf-472e-9298-b734980f2c32">작가 pikisuperstar</a> 출처 Freepik

function Mainpage() {
    const member = JSON.parse(window.sessionStorage.getItem("member"));
    return (
        <>
            <div data-v-4b6b04e7="" className="cont_main area_responsible">

                <div data-v-4b6b04e7="" className="inner_main inner_responsible">
                    <Link to={!member || !member.result ? "/login" : "/recdkcal"}>
                        <div data-v-4b6b04e7="" className="box_responsible type_esg">
                            <span data-v-4b6b04e7="" className="title_responsible" />
                            <img data-v-a968263a="" data-v-4b6b04e7="" src={foodsearch} className="img_foodsearch" />
                            <p data-v-4b6b04e7="" className="text_responsible">식단 관리</p>

                            <a data-v-4b6b04e7="" href="/page/responsible/esg" data-tiara-layer="Area_Main_responsible" data-tiara-action-name="Click_Main_esg" className="btn_area">
                                <span data-v-4b6b04e7="" className="screen_out">바로가기</span>
                                <svg data-v-42492cb5="" data-v-4b6b04e7="" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" className="btn_arr_big">
                                    <circle data-v-42492cb5="" cx="32" cy="31.9961" r="32" fill="black" />
                                    <path data-v-42492cb5="" d="M34.9292 25.5325L33.515 26.9467L38.1748 31.6065L23 31.6074V33.6015L38.1748 33.6005L33.515 38.2604L34.9292 39.6746L42.0002 32.6035L34.9292 25.5325Z" fill="white" />
                                </svg>
                            </a>
                        </div>
                    </Link>

                    <Link to="/freeboard">
                        <div data-v-4b6b04e7="" className="box_responsible type_green">
                            <span data-v-4b6b04e7="" className="title_responsible" />
                            <img data-v-a968263a="" data-v-4b6b04e7="" src={community} className="img_community" />
                            <p data-v-4b6b04e7="" className="text_responsible">커뮤니티</p>
                            <a data-v-4b6b04e7="" href="/page/responsible/activegreen" data-tiara-layer="Area_Main_responsible" data-tiara-action-name="Click_Main_activeGreen" className="btn_area">
                                <svg data-v-42492cb5="" data-v-4b6b04e7="" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" className="btn_arr_big">
                                    <circle data-v-42492cb5="" cx="32" cy="31.9961" r="32" fill="black"></circle>
                                    <path data-v-42492cb5="" d="M34.9292 25.5325L33.515 26.9467L38.1748 31.6065L23 31.6074V33.6015L38.1748 33.6005L33.515 38.2604L34.9292 39.6746L42.0002 32.6035L34.9292 25.5325Z" fill="white"></path>
                                </svg>
                            </a>
                        </div>
                    </Link>
                </div>
            </div >
        </>
    );
}

export default Mainpage;