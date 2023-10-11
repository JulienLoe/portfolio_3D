import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles.css'
import { createRoot } from "react-dom/client"
import { Stats } from '@react-three/drei'
import { Leva } from 'leva';
import 'bootstrap/dist/css/bootstrap.css';



  function Overlay(){
    
  return(
    <>
    <App />
    <Stats />
      </>
  )
  }

  createRoot(document.getElementById('root')).render(<Overlay />)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
