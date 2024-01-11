import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./component/common/header/Header";
import Footer from "./component/common/footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Header></Header>

    <Footer></Footer>
  </>
);

reportWebVitals();
