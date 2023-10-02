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
    const [ready, set] = useState(false)
    const [ready2, set2] = useState(false)
    const [view, setView] = useState(false)
    
  return(
    <>
    <App />
    <Stats />
    <Leva collapsed />
    {/* <div className="dot" />
      <div className={`fullscreen bg ${ready ? "ready" : "notready"} ${ready && "clicked"}`}>
      <p>Le but du jeu est de trouver mon CV en moins de 5 min. Pour celà il faudra trouver une clé cachée dans le chateau pour ouvrir un coffre qui contient le CV.</p>
        <p>Enigme n°1 : Je suis un soldat qui porte le nom d'une bête légendaire</p>
        <div className="stack">
          <button onClick={() => set(true)}>Start</button>
        </div>
        <p>Conseil : Afin d'éviter la triche il faudra être précis lors de la sélection de l'objet avec votre pointeur</p>
      </div> */}
      </>
  )
  }

  createRoot(document.getElementById('root')).render(<Overlay />)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
