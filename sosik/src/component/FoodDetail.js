import React from "react";
import "../common/css/foodDetail.css";


const Fd_section1 = () => {
    return (
        <div className="fd-section1">
            <div className="food-name">사과</div>
            <div className="food-content">
                <p>
                    과일의 하나이다. 과육은 기본적으로 노란색에서 연두색 이며, 맛은 품종마다 다르다. 아래 사과 품종 문단을 참고하자.
                    일반적으로 한국에서 말하는 사과 맛은 달콤새콤 + 아삭아삭하게 씹히는 탄력이 있고 단단한 과육의 식감을 말한다.
                    종마다 다르지만 잘 익은 사과는 껍질이 벗겨지지 않은 상태에서도 청량감이 있는 좋은 냄새가 난다.
                </p>
            </div>
            <hr />
        </div>
    );
};

const Fd_section2 = () => {
    return (
        <div className="fd-section2">
            <div className="nutrient-info">
                <div className="nutrient-info-title1">영양정보</div>
                <div className="nutrient-info-title2">(100g 기준)</div>
            </div>

            <div className="nutrient-content">
                <div className="nutrient">
                    <p className="nutrient-title1">탄수화물</p>
                    <p className="nutrient-title2">100g</p>
                </div>
                <div className="nutrient">
                    <p className="nutrient-title1">단백질</p>
                    <p className="nutrient-title2">100g</p>
                </div>
                <div className="nutrient">
                    <p className="nutrient-title1">지방</p>
                    <p className="nutrient-title2">100g</p>
                </div>
                <div className="nutrient">
                    <p className="nutrient-title1">나트륨</p>
                    <p className="nutrient-title2">100g</p>
                </div>
                <div className="nutrient">
                    <p className="nutrient-title1">콜레스테롤</p>
                    <p className="nutrient-title2">100g</p>
                </div>
                <div className="nutrient">
                    <p className="nutrient-title1">탄수화물</p>
                    <p className="nutrient-title2">100g</p>
                </div>
                <div className="nutrient">
                    <p className="nutrient-title1">탄수화물</p>
                    <p className="nutrient-title2">100g</p>
                </div>
                <div className="nutrient">
                    <p className="nutrient-title1">탄수화물</p>
                    <p className="nutrient-title2">100g</p>
                </div>
            </div>

            <div className="food-calorie">
                <div className="calorie-intake">
                    <p className="kcal-title1">섭취열량</p>
                    <p className="kcal-title2">1000</p>
                    <p className="kcal-title3">kcal</p>
                </div>
            </div>
            <hr />
        </div>
    );
};

const Fd_section3 = () => {
    return (
        <div className="fd-section3">
            <div className="related-dishes">관련요리</div>

            <div className="related-dishes-content">
                <a href="#" className="related-dishes-name"># 사과샐러드</a>
                <a href="#" className="related-dishes-name"># 애플파이</a>
                <a href="#" className="related-dishes-name"># 사과쥬스</a>
            </div>
        </div>
    );
};


const FoodDetail = () => {
    return (
        <div>
            <Fd_section1 />
            <Fd_section2 />
            <Fd_section3 />
        </div>
    );
};

export default FoodDetail;