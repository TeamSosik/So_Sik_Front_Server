import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./component/common/header/Header";
import Footer from "./component/common/footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Header></Header>
    <div style={{ flex: 1 }}>
    </div>
    <Footer></Footer>
  </div>
);

reportWebVitals();
