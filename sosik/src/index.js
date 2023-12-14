import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import "./index.css";
import MyHeader from "./component/header/MyHeader";
import Signup from "./component/Sign_up"
import Login from "./component/Login";
import Recipeboardinfo from "./page/recipeboardinfo"
import Recipeboardlist from "./page/recipeboardlist"
import Recipeboardwrite from "./page/recipeboardwrite"
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header></Header>
    <Recipeboardinfo></Recipeboardinfo>
    <Recipeboardlist></Recipeboardlist>
    <Recipeboardwrite></Recipeboardwrite>
    <Footer></Footer>
  </React.StrictMode>

);

reportWebVitals();
