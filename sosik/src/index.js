import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Inputkcal from './Inputkcal';


import reportWebVitals from './reportWebVitals';
import Footer from './component/footer/Footer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Inputkcal/>
  </React.StrictMode>
);


reportWebVitals();
