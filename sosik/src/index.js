import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import "./index.css";
import Section3 from "./Inputkcal";
import Section1 from "./component/section1/section1";
import Section2 from "./component/lhj/Section2";
import MyHeader from "./component/header/MyHeader";

import Footer from "./component/footer/Footer";

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

reportWebVitals();
