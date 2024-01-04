import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import "./index.css";
import MyHeader from "./component/header/MyHeader";
import Signup from "./component/Sign_up"
import Login from "./component/Login";
import Section2 from "./component/lhj/Section2";
import Section3 from "./component/Inputkcal";
import Section1 from "./component/section1/section1"
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header></Header>
    <Footer></Footer>
  </React.StrictMode>

);

reportWebVitals();
