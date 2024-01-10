import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Calendarview from './component/calendar/Calendarview';
import MyPage from "./component/Mypage";
import RecdAnly from "./component/Record/RecdAnly";
import RecdKcal from "./component/Record/RecdKcal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header></Header>
    <Footer></Footer>
  </React.StrictMode>
);

reportWebVitals();
