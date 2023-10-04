
import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, Preload, OrbitControls, useAnimations, useGLTF, Stage, BakeShadows } from '@react-three/drei'
import { Popconfirm } from 'antd'
import {Maison} from "./Maison"
import {Maison2} from "./Maison2"
import {Billiards_room} from "./Billiards_room"
import { SmallDrawingRoom } from './SmallDrawingRoom'
import { Armoury } from './Armoury'
import song from './assets/Cinematic_Sad_Melancholic_Sentimental_Grand_Piano_Production_Theme_Soundtrack_014_-_PremiumMusic.mp3'
import animationGLB from './assets/treasure_chest.glb'
import { Physics } from "@react-three/rapier"
import { Key } from './Key'
import {DragoonOfficerSabre} from "./DragoonOfficerSabre"
import logo from './assets/key.png'
import { GoldenTrophy } from './GoldenTrophy'
import PDFReader from './PDFReader'
import {
  useProgress
} from "@react-three/drei";
import { Castle } from './Castle'
import "react-circular-progressbar/dist/styles.css";
import Timer from './Timer'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import Index from './index'; 
import { Link } from 'react-router-dom'

const Scene = () => {
    const [click, setClick] = useState(false)
  const [clickMusicBilliard, setClickMusicBilliard] = useState(false)
  const [clickBilliardMusic, setClickBilliardMusic] = useState(false) 
  const [clickStartDrawingRoom, setClickStartDrawingRoom] = useState(false)
  const [clickDrawingRoomArmoury, setClickDrawingRoomArmoury] = useState(false)
  const [clickArmouryDrawingRoom, setClickArmouryDrawingRoom] = useState(false)
  const [clickSabre, setClickSabre] = useState([79.6, -1, 80])
  const [singleTime, setSingleTime] = useState(false);
  const [key, setKey] = useState(false);
  const [keyLost, setKeyLost] = useState(true);
  const [tresor, setTresor] = useState([100, 0, 100])
  const [tresorBoolean, setTresorBoolean] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [cv, setCv] = useState(false);
  const [ready, set] = useState(false)
  const [ready2, set2] = useState(false)
  const [ready3, set3] = useState(false)
  const [ready4, set4] = useState(false)
  const [ready5, set5] = useState(false)
  const [view2, setView2] = useState(false)
  const [view3, setView3] = useState(false)
  const [view4, setView4] = useState(false)
  const [view5, setView5] = useState(false)
  const [viewCastle, setViewCastle] = useState(false)
  const [viewCastleLarge, setViewCastleLarge] = useState(true)
  const [titleStart, setTitleStart] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [position, setPosition] = useState([0, 0, 0]);
  const navigate = useNavigate();
 
  const handleGoHome = () => {
    navigate(-1); // New line
  };
  const threeCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  threeCamera.position.set(0, 0, -0.1);
  // threeCamera.position.set(602, 0, 600);

  const listener = new THREE.AudioListener();
threeCamera.add( listener );

  // create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( song, function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});

const [isStarted, setIsStarted] = useState(false);

useGLTF.preload(animationGLB)
function Model(props, onClick) {
  
  // let mixer = null;
  
  
  const { nodes, materials, animations, scene , obj} = useGLTF(animationGLB)
  // animations.setLoop(THREE.LoopOnce)
  
  const { ref, actions, names } = useAnimations(animations)
 
  // mixer = new THREE.AnimationMixer(scene);
  
  
  useEffect(() => {
    if(openBox == true && key == true){
    let animation = actions[names[0]].play()
    animation.setLoop(THREE.LoopOnce)
    setTimeout(() =>{setKey(false)}, 1000)
    }
  },[tresorBoolean, openBox, key]);
  
  return (
    <>
    <group {...props}  ref={ref} scale={0.01} rotation={[1.55, Math.PI / 1, -1.8]} >
            <primitive  object={nodes.top_01}/>
            <primitive  object={nodes.root_00}/>
            <primitive  object={nodes._rootJoint}/>
      
      <skinnedMesh  receiveShadow castShadow skinning  geometry={nodes.Object_10.geometry} skeleton={nodes.Object_10.skeleton} material={materials.M_Chest_Reinforcment}/>
      <skinnedMesh  receiveShadow castShadow skinning  geometry={nodes.Object_11.geometry} skeleton={nodes.Object_11.skeleton} material={materials.M_Chest_Wood}/>
    </group>
    </>
  )
}

function Dome({ name, position, texture, onClick }) {
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh scale={clicked ? 1.1 : 1} position={[2, 0, 0.2]}>
          <sphereGeometry args={[0.2, 22, 22]} />
          <meshBasicMaterial color="white" />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#" onPointerOver={() => setClicked(true)} onPointerOut={() => setClicked(false)}>Salle de musique</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }
  
  function Dome2({ name, position, texture, onClick }) {
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh scale={clicked ? 1.1 : 1} position={[21, 0, 21]}>
          <sphereGeometry args={[0.3, 22, 22]} />
          <meshBasicMaterial color="white" />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#" onPointerOver={() => setClicked(true)} onPointerOut={() => setClicked(false)}>Salle à manger</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }
  
  
  function Dome_billiard_music({ name, position, texture, onClick }) {
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh scale={clicked ? 1.1 : 1} position={[34.6, 0, 48.7]}>
          <sphereGeometry args={[0.4, 22, 22]} />
          <meshBasicMaterial color="white" />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#" onPointerOver={() => setClicked(true)} onPointerOut={() => setClicked(false)}>Salle de musique</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }

  function Dome_music_billiard({ name, position, texture, onClick }) {
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh scale={clicked ? 1.1 : 1} position={[22, 0, 14]}>
          <sphereGeometry  args={[0.4, 22, 22]} />
          <meshBasicMaterial   color={clicked ? "white" : "white"} />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#" onPointerOver={() => setClicked(true)} onPointerOut={() => setClicked(false)}>Salle de Billard</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }

  function Dome_start_drawingRoom({ name, position, texture, onClick }) {
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh scale={clicked ? 1.1 : 1} position={[-4, 0, 0.5]}>
          <sphereGeometry  args={[0.2, 22, 22]} />
          <meshBasicMaterial   color={clicked ? "white" : "white"} />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#" onPointerOver={() => setClicked(true)} onPointerOut={() => setClicked(false)}>Petit Salon</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }

  function Dome_drawingRoom_start({ name, position, texture, onClick }) {
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh scale={clicked ? 1.1 : 1} position={[59, 0, 64]}>
          <sphereGeometry  args={[0.33, 22, 22]} />
          <meshBasicMaterial   color={clicked ? "white" : "white"} />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#" onPointerOver={() => setClicked(true)} onPointerOut={() => setClicked(false)}>Salle à manger</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }

  function Dome_drawingRoom_armoury({ name, position, texture, onClick }) {
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh scale={clicked ? 1.1 : 1} position={[60.1, 0, 56.4]}>
          <sphereGeometry  args={[0.4, 22, 22]} />
          <meshBasicMaterial   color={clicked ? "white" : "white"} />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#" onPointerOver={() => setClicked(true)} onPointerOut={() => setClicked(false)}>Armurie</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }

  function Dome_armoury_drawingRoom({ name, position, texture, onClick }) {
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh scale={clicked ? 1.1 : 1} position={[80.9, 0, 80.8]}>
          <sphereGeometry  args={[0.2, 22, 22]} />
          <meshBasicMaterial   color={clicked ? "white" : "white"} />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#" onPointerOver={() => setClicked(true)} onPointerOut={() => setClicked(false)}>Petit Salon</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }

  function Dome_Sabre({ name, position, texture, onClick }) {
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh >
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
        <mesh  scale={clicked ? 1.1 : 1} position={[0, 0, 1]}>
          <sphereGeometry  args={[0, 22, 22]} />
          <meshBasicMaterial  color={clicked ? "white" : "white"} />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a href="#" >Sabre</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }

  function Portals() {
    return <Dome onClick={function start() {setPosition([20, 0, 20]); setClick(!click)}}/>
  }

  function Portals2() {
    return <Dome2 onClick={function start() {setPosition([0, 0, 0]); setClick(!click); 
      if(clickBilliardMusic == true){
      setClickBilliardMusic(!clickBilliardMusic)
    }}}/>
  }

  function Portals_music_billard() {
    return <Dome_music_billiard  onClick={function start() {setPosition([36, 0, 46]); 
    
      setClickMusicBilliard(true); setClickBilliardMusic(false);
      }}/>
  }

  function Portals_billard_music() {
    return <Dome_billiard_music onClick={function start() {setPosition([22, 0, 16]); 
  
      setClickMusicBilliard(false); setClickBilliardMusic(true)}
    
    }/>
  }

  function Portals_start_drawingRoom() {
    return <Dome_start_drawingRoom onClick={function start() {setPosition([59, 0, 63]); setClickStartDrawingRoom(true)}}/>
  }

  function Portals_drawingRoom_start() {
    return <Dome_drawingRoom_start onClick={function start() {setPosition([0, 0, 0]); setClickStartDrawingRoom(false); setClickArmouryDrawingRoom(false); 
    console.log(key) ; setKeyLost(false)
  }}/>
  }

  function Portals_drawingRoom_armoury() {
    return <Dome_drawingRoom_armoury onClick={function start() {setPosition([79.6, 0, 80]); setClickDrawingRoomArmoury(true); setClickArmouryDrawingRoom(false)}}/>
  }

  function Portals_armoury_drawingRoom() {
    return <Dome_armoury_drawingRoom onClick={function start() {setPosition([60, 0, 58]); setClickArmouryDrawingRoom(true); setClickDrawingRoomArmoury(false) }}/>
  }

  useEffect(()=>{
    if(viewCastle == true){
      threeCamera.position.set(0, 0, -0.1);
    }
    if(click == true){
      threeCamera.position.set(20, 0.1, 20.6);
    }
    if(clickMusicBilliard == true){
      threeCamera.position.set(36, 0.1, 46.6);
    }
    if(clickBilliardMusic == true){
      threeCamera.position.set(22, 0.1, 15.4);
    }
    if(clickStartDrawingRoom == true){
      threeCamera.position.set(59, 0.1, 63.6);
    }
    if(clickDrawingRoomArmoury == true){
      threeCamera.position.set(79.6, 0.1, 80.2);
    }
    if(clickArmouryDrawingRoom == true){
      threeCamera.position.set(60, 0.1, 57.4);
    }
    if(openBox == true){
      threeCamera.position.set(36, 0.1, 46.6);
    }
    
  }, [click, clickMusicBilliard, clickBilliardMusic, clickStartDrawingRoom, clickDrawingRoomArmoury, clickArmouryDrawingRoom, clickSabre,openBox, key, cv])
  
  function Loader() {
    const { progress } = useProgress();
    return <Html center>
      
        <div className="fullScreen">
          <h1 id='btnStart'>{Math.trunc(progress)} % loaded</h1>
        </div>
      </Html>;
  }
  
const signs = document.querySelectorAll('x-sign')
const randomIn = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
)

const mixupInterval = el => {
  const ms = randomIn(2000, 4000)
  el.style.setProperty('--interval', `${ms}ms`)
}

signs.forEach(el => {
  mixupInterval(el)
  el.addEventListener('webkitAnimationIteration', () => {
    mixupInterval(el)
  })
})
  
    
  return (
    <>
    {ready ? <Timer isStarted></Timer> : null }
    {cv ? <div id='cv'>
    <PDFReader></PDFReader>
    <button id='btnReturn' onClick={() =>{setCv(false)}}>Return game</button>
    </div> : null }
    {key ? <div id='key'><img width="100" height="100" src={logo}></img></div> : null}
    {openBox && !key && tresorBoolean != true ? 
    <div id='openBox'>
      <div id='textOpenBox'>
        <p>Vous n'avez pas la clé !</p>
      </div>
    </div> : null }
    {viewCastleLarge ? <Canvas shadows camera={{ position: [0, 0, 150], fov: 40 }}>
      <Stage environment="city" intensity={0.6}>
        <Castle position={[0, 0, 0]}></Castle>
      </Stage>
      <BakeShadows />
      <OrbitControls makeDefault autoRotate />
    </Canvas>
    : null }

    {viewCastle ? <Canvas frameloop="always" rotation={[0,0,0]} camera={threeCamera}>
    
      <Physics gravity={[0, -30, 0]}>
      <ambientLight intensity={3} />
      <OrbitControls makeDefault  target={position} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2}  rotateSpeed={-0.5}/>
      <Suspense fallback={<Loader></Loader>}>
        
        <Preload all />
        <Maison scale={1}  position={[0, 0, -5]}></Maison>
        <Maison2 scale={1} position={[20, -2, 20]}></Maison2>
        <Billiards_room scale={1} position={[38, -5, 40]}></Billiards_room>
        <SmallDrawingRoom scale={1} position={[60, -2, 60]}></SmallDrawingRoom>
        <Armoury scale={1} position={[80, -0.7, 80]}></Armoury>
        <DragoonOfficerSabre onClick={()=> { if(singleTime == false){setClickSabre([79.6, 0, 80]); setSingleTime(true); setKey(true); setTimeout(() => {
  setClickSabre([79.6, -1, 80]);
}, 5000);
        }}} 
rotation={[0, Math.PI / -1.3, -4.5]} position={[79.5, -0.02, 79.05]} scale={0.001}></DragoonOfficerSabre>
        {/* { tresorBoolean ? setTimeout(() =>{setTimer(true); console.log(timer)}, 1000) : null } */}
        <GoldenTrophy position={tresor} scale={0.0007} onClick={()=>{setCv(true)}}></GoldenTrophy>
        
        {keyLost ? <Key position={(clickSabre)} scale={0.02}></Key> : null}
        
        <Model position={[32, -1.9, 40.5]}  onClick={()=>{ console.log(openBox); setOpenBox(true);if(key == true){setTresor([36, 0, 46]); setTresorBoolean(true)}; setTimeout(() => {setOpenBox(false)
  
}, 1000);}}/>
        {!click && clickStartDrawingRoom != true ? <Portals></Portals> : null}
        {click && clickMusicBilliard != true  ? <Portals2></Portals2> : null}
        {!clickMusicBilliard && click != false ? <Portals_music_billard></Portals_music_billard> : null}
        {clickMusicBilliard ? <Portals_billard_music></Portals_billard_music> : null}
        {click == false && clickMusicBilliard == false && clickStartDrawingRoom == false  ? <Portals_start_drawingRoom></Portals_start_drawingRoom> : null}
        {clickStartDrawingRoom && clickDrawingRoomArmoury != true ? <Portals_drawingRoom_start></Portals_drawingRoom_start> : null}
        {clickDrawingRoomArmoury == false && clickStartDrawingRoom == true ? <Portals_drawingRoom_armoury></Portals_drawingRoom_armoury> : null}
        {clickDrawingRoomArmoury ? <Portals_armoury_drawingRoom></Portals_armoury_drawingRoom> : null}
        
      </Suspense>
      </Physics>
    </Canvas>
    : null }
    {ready ? setTimeout(() =>{setTitleStart(false)}, 4000) : null}
    {ready ? setTimeout(() =>{setGameOver(true)}, 300000) : null}
    { viewCastleLarge ?
      <div className="fullCastle">
      <p id='titleGame'>CASTLEQUEST</p>
      
        <br></br>
        <br></br>
        <div className="stack">
          <button id='x-sign' onClick={() => { setViewCastle(true); setPosition([0, 0, 0]); setViewCastleLarge(false) }}>START</button>
        </div>
      </div>
      :null}

{ ready && titleStart ?
      <div className="fullCastle">
      <p id='titleGame'>CASTLEQUEST</p>
      
        
      </div>
      :null}

{ ready && !gameOver ?
      <div className="fullCastle">
      <p id='x-sign2'>GAME OVER</p>
      
      <br></br>
        <br></br>
        <div className="stack">
          
          <button id='x-sign' onClick={() =>navigate("/")}>RESTART</button>
        </div>
        
      </div>
      :null}
      
    {viewCastle ?
    <> 
    <div className="dot" />
      <div className={`fullscreen bg ${ready ? "ready" : "notready"} ${ready && "clicked"}`}>
      <p>Le but du jeu est de trouver mon CV en moins de 8 min. Pour celà il faudra trouver une clé cachée dans le chateau pour ouvrir un coffre qui contient le CV.</p>
      <br></br>
        <br></br>
        <p>Enigme n°1 : Je suis un soldat qui porte le nom d'une bête légendaire</p>
        <br></br>
        <br></br>
        <div className="stack">
          <button id='x-sign' onClick={() => set(true)}>START</button>
        </div>
        <p>Conseil :Il faudra être précis lors de la sélection de l'objet avec votre pointeur</p>
        <br></br>
        <p>Pour obtenir directement le CV sans jouer cliquez sur le bouton ci-dessous</p>
        <div className="stack">
          <button class="glow-on-hover" onClick={() => setCv(true)}>CV</button>
        </div>
      </div>
      </>
   : null }
    {ready ? setTimeout(() =>{console.log(view2); setView2(true)}, 100000) : null}
      {view2 && key == false && ready ?
        <>
        <div className="dot" />
        <div className={`fullscreen bg ${ready2 ? "ready" : "notready"} ${ready2 && "clicked"}`}>
          <p>Enigme n°2 : Je suis une arme portée par les officiers</p>
          <div className="stack">
            <button id='x-sign' onClick={() => set2(true)}>Continue</button>
          </div>
        </div>
        </>
        : null }

{ready && ready2 ? setTimeout(() =>{setView3(true)}, 180000) : null}
      {view3  && key == false && ready ?
        <>
        <div className="dot" />
        <div className={`fullscreen bg ${ready3 ? "ready" : "notready"} ${ready3 && "clicked"}`}>
          <p>L'arme se trouve dans l'armurie.</p>
          <div className="stack">
            <button id='x-sign' onClick={() => set3(true)}>Continue</button>
          </div>
        </div>
        </>
        : null }

{key && ready3 ? setTimeout(() =>{setView4(true)}, 60000) : null}
      {view4  && key == true && ready ?
        <>
        <div className="dot" />
        <div className={`fullscreen bg ${ready4 ? "ready" : "notready"} ${ready4 && "clicked"}`}>
          <p>Enigme n°3 : La clé se montrera utile dans une piéce dédiée à l'amusement</p>
          <div className="stack">
            <button id='x-sign' onClick={() => set4(true)}>Continue</button>
          </div>
        </div>
        </>
        : null }

{ key && ready4 ? setTimeout(() =>{setView5(true)}, 120000) : null}
      {view5  && key == true && ready ?
        <>
        <div className="dot" />
        <div className={`fullscreen bg ${ready5 ? "ready" : "notready"} ${ready5 && "clicked"}`}>
          <p>Le coffre se trouve dans la salle de billard</p>
          <div className="stack">
            <button id='x-sign' onClick={() => set5(true)}>Continue</button>
          </div>
        </div>
        </>
        : null }
    </>
  )
};

export default Scene;