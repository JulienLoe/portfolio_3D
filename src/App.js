import * as THREE from 'three'
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls, useAnimations, useGLTF, useTexture, Clone } from '@react-three/drei'
import { Popconfirm } from 'antd'
import {Maison} from "./Maison"
import {Maison2} from "./Maison2"
import {Billiards_room} from "./Billiards_room"
import {Boite_tresor} from "./Boite_tresor"
import { SmallDrawingRoom } from './SmallDrawingRoom'
import { Armoury } from './Armoury'
import song from './assets/Cinematic_Sad_Melancholic_Sentimental_Grand_Piano_Production_Theme_Soundtrack_014_-_PremiumMusic.mp3'
import animationGLB from './assets/treasure_chest.glb'
import { BoiteAnimation } from './BoiteAnimation'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import green from "./assets/vert.jpg"
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier"
import gltf from './assets/scene.gltf'

import { Key } from './Key'
import key from "./assets/key.glb"
import glb from "./assets/dragoon_officers_sabre.glb"
import {DragoonOfficerSabre} from "./DragoonOfficerSabre"
import logo from './assets/key.png'
import { GoldenTrophy } from './GoldenTrophy'
import Cv from './Cv'
import PDFReader from './PDFReader'


const store = [
  { name: 'Salle de musique', color: 'lightpink', position: [10, 0, -15], url: './2294472375_24a3b8ef46_o.jpg', link: 1 },
  { name: 'inside', color: 'lightblue', position: [15, 0, 0], url: './Photosphere1.jpg', link: 0 }
  // ...
]
// const store = [
//   { position: [10, 0, -15]},
//   { position: [15, 0, 0]}
//   // ...
// ]

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

// function Dome_music_billiard({ name, position, texture, onClick, clicked }) {
  
//   return (
//     <group>
//       <mesh>
//         <sphereGeometry args={[500, 60, 40]} />
//         <meshBasicMaterial map={texture} side={THREE.BackSide} />
//       </mesh>
//       <mesh position={[22, 0, 14]}>
//         <sphereGeometry args={[0.2, 22, 22]} />
//         <meshBasicMaterial scale={clicked ? 1.5 : 1}  color="white" />
//         <Html center>
//           <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
//             <a href="#">Salle de Billard</a>
//           </Popconfirm>
//         </Html>
//       </mesh>
//     </group>
//   )
// }

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

export default function App() {
 
  const [click, setClick] = useState(false)
  const [clickMusicBilliard, setClickMusicBilliard] = useState(false)
  const [clickBilliardMusic, setClickBilliardMusic] = useState(false) 
  const [clickStartDrawingRoom, setClickStartDrawingRoom] = useState(false)
  const [clickDrawingRoomArmoury, setClickDrawingRoomArmoury] = useState(false)
  const [clickArmouryDrawingRoom, setClickArmouryDrawingRoom] = useState(false)
  const [clickSabre, setClickSabre] = useState([79.6, -1, 80])
  const [singleTime, setSingleTime] = useState(false);
  const [key, setKey] = useState(true);
  const [keyLost, setKeyLost] = useState(true);
  const [tresor, setTresor] = useState([100, 0, 100])
  const [tresorBoolean, setTresorBoolean] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [timer, setTimer] = useState(false)
  const [cv, setCv] = useState(false);
  const [position, setPosition] = useState([0, 0, 0]);
  const threeCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  threeCamera.position.set(0, 0, -0.1);

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



useGLTF.preload(animationGLB)
function Model(props, onClick) {
  
  // let mixer = null;
  
  
  const { nodes, materials, animations, scene , obj} = useGLTF(animationGLB)
  // animations.setLoop(THREE.LoopOnce)
  
  const { ref, actions, names } = useAnimations(animations)
 
  // mixer = new THREE.AnimationMixer(scene);
  
  
  useEffect(() => {
    if(tresorBoolean == true && key == true){
    let animation = actions[names[0]].play()
    animation.setLoop(THREE.LoopOnce)
    setKey(false)
    }
    
  },[tresorBoolean, key]);
  
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
    
  }, [click, clickMusicBilliard, clickBilliardMusic, clickStartDrawingRoom, clickDrawingRoomArmoury, clickArmouryDrawingRoom, clickSabre, key,openBox, cv])
  
    
  
    

    // function MyRotatingBox(props) {
    //   let mixer = null;
      
    //   const { nodes, materials, ref, animations, scene } = useGLTF(key)
    //   mixer = new THREE.AnimationMixer(scene);
    //   const myMesh = React.useRef();
      
    //   useFrame(({ clock }) => {
    //     const a = clock.getElapsedTime();
    //     myMesh.current.rotation.x = a;
    //   });
    //   return (

    //     <Key {...props} ref={myMesh}></Key>
    //     // <group ref={myMesh} {...props} >
    //     //   <primitive  object={scene} />
    //     //   {/* <skinnedMesh castShadow receiveShadow material={materials.Wood_diffuse} /> */}
    //     // </group>
    //   )
    // }

    // function DragoonOfficerSabre(props) {
    //   function Model() {
    //     const { scene } = useGLTF(glb)
    //     return <Clone object={scene} />
    //   }
    
    //   return (
    //     <group onClick={()=> setClickSabre(!clickSabre)} {...props} dispose={null}>
    //     <Model></Model>
    //     </group>
    //   )
      
    // }
  
  return (
    <>
    {cv ? <div id='cv'>
    <PDFReader></PDFReader>
    </div> : null }
    {key ? <div id='key'><img width="100" height="100" src={logo}></img></div> : null}
    {openBox && !key && !tresorBoolean ? 
    <div id='openBox'>
      <div id='textOpenBox'>
        <p>Vous n'avez pas la clé !</p>
      </div>
    </div> : null }
    <Canvas frameloop="always" rotation={[0,0,0]} camera={threeCamera}>
      <Physics gravity={[0, -30, 0]}>
      <ambientLight intensity={3} />
      <OrbitControls makeDefault  target={position} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2}  rotateSpeed={-0.5}/>
      <Suspense fallback={null}>
        
        <Preload all />
        <Maison scale={1}  position={[0, 0, -5]}></Maison>
        <Maison2 scale={1} position={[20, -2, 20]}></Maison2>
        <Billiards_room scale={1} position={[38, -5, 40]}></Billiards_room>
        <SmallDrawingRoom scale={1} position={[60, -2, 60]}></SmallDrawingRoom>
        <Armoury scale={1} position={[80, -0.7, 80]}></Armoury>
        <DragoonOfficerSabre onClick={()=> { if(singleTime == false){setClickSabre([79.6, 0, 80]); setSingleTime(true); setKey(true); setTimeout(() => {
  setClickSabre(false);
}, 5000);
        }}} 
rotation={[0, Math.PI / -1.3, -4.5]} position={[79.5, 0, 79.05]} scale={0.001}></DragoonOfficerSabre>
        {/* { tresorBoolean ? setTimeout(() =>{setTimer(true); console.log(timer)}, 1000) : null } */}
        <GoldenTrophy position={tresor} scale={0.0007} onClick={()=>{setCv(true)}}></GoldenTrophy>
        
        {keyLost ? <Key position={(clickSabre)} scale={0.02}></Key> : null}
        
        <Model position={[32, -1.9, 40.5]}  onClick={()=>{ console.log(openBox); setOpenBox(true);if(key == true){ console.log(timer); setTresorBoolean(true)}; setTimeout(() => {setOpenBox(false)
  
}, 8000);}}/>
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
    </>
  )
}
