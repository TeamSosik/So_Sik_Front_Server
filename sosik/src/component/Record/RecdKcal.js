import React from "react";
import "../../common/css/record/recdKcal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const RecdKcal_section2 = () => {
    return (
        <div>
            <div className="recd-kcal-section2">
                <div className="meal-title"><FontAwesomeIcon icon={faAngleLeft} size="2xs" style={{ color: "#000000", marginRight: 30 }} /> 아침 식사 <FontAwesomeIcon icon={faAngleRight} size="2xs" style={{ color: "#000000", marginLeft: 30 }} /></div>
                <div className="meal-content">
                    <div className="meal">
                        <div className="meal-name">
                            된장찌개
                            <p>(1인분 / 100g기준)</p>
                        </div>
                        <div className="nutrient">
                            <div className="nutrient-detail">
                                <span className="nutrient-name">
                                    탄수화물
                                </span>
                                <span className="nutrient-name">
                                    단백질
                                </span>
                                <span className="nutrient-name">
                                    지방
                                </span>
                                <span className="nutrient-name">
                                    kcal
                                </span>
                            </div>
                            <div className="nutrient-gram">
                                <span>50</span>
                                <span>50</span>
                                <span>50</span>
                                <span>50</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="meal-intake-kcal">

                </div>
            </div>
        </div>
    )
};

const RecdKcal_section3 = () => {
    return (
        <div>
            <div className="recd-kcal-section3">
                <div className="total-intake-title">오늘의 총 섭취 영양소</div>
                <div className="total-intake-content">
                    <div className="total-intake">
                        <p className="total-intake-name1">탄수화물</p>
                        <p className="total-intake-name2">1000</p>
                    </div>
                    <div className="total-intake">
                        <p className="total-intake-name1">단백질</p>
                        <p className="total-intake-name2">1000</p>
                    </div>
                    <div className="total-intake">
                        <p className="total-intake-name1">지방</p>
                        <p className="total-intake-name2">1000</p>
                    </div>
                    <div className="total-intake">
                        <p className="total-intake-name1">kcal</p>
                        <p className="total-intake-name2">3000</p>
                    </div>
                </div>
            </div>
        </div>
    )
};


const RecdAnly = () => {
    return (
        <div>
            <RecdKcal_section2></RecdKcal_section2>
            <RecdKcal_section3></RecdKcal_section3>
        </div>
    );
};

export default RecdAnly;
