import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MyHeader from "./component/header/MyHeader";
import Section1 from "./component/section1/section1";
import Section2 from "./component/"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyHeader></MyHeader>
    <Section1></Section1>
    <Section2></Section2>
    <Section3></Section3>
    <Footer></Footer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
