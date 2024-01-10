import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import "./index.css";
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
