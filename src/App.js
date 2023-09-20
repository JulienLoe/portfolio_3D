import * as THREE from 'three'
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { Popconfirm } from 'antd'
import {Maison} from "./Maison"
import {Maison2} from "./Maison2"
import {Billiards_room} from "./Billiards_room"
import {Boite_tresor} from "./Boite_tresor"
import { SmallDrawingRoom } from './SmallDrawingRoom'
import { Armoury } from './Armoury'
import song from './assets/Cinematic_Sad_Melancholic_Sentimental_Grand_Piano_Production_Theme_Soundtrack_014_-_PremiumMusic.mp3'
import animationGLB from './assets/wooden_box.glb'
import { BoiteAnimation } from './BoiteAnimation'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import grass from "./assets/Wood_diffuse.jpeg"
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier"
import gltf from './assets/scene.gltf'
import { DragoonOfficerSabre } from './DragoonOfficerSabre'
import { Key } from './Key'
import key from "./assets/key.glb"

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
  const [clickSabre, setClickSabre] = useState(true)
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


function TheModel() {
  
  const { nodes, materials } = useGLTF(animationGLB)
  let mixer = null;
  const { scene, animations } = useLoader(GLTFLoader, animationGLB);
  // console.log(scene);
  mixer = new THREE.AnimationMixer(scene);
 
 
  void mixer.clipAction(animations[0]).play();
  useFrame((state, delta) => {
    mixer.update(delta);
    // console.log(ca);
  });
  return <mesh material={materials.Wood} material-envMapIntensity={0.8}><meshStandardMaterial ></meshStandardMaterial><primitive  scale={0.1} object={scene} position={[0, 0, 0]} /></mesh> ;
}

function Model(props) {
  let mixer = null;
  
  const { nodes, materials, ref, animations, scene } = useGLTF(animationGLB)
  mixer = new THREE.AnimationMixer(scene);
  
  void mixer.clipAction(animations[0]).play()
  useFrame((state, delta) => {
    mixer.update(delta);
    // console.log(ca);
  });
  return (
    <group {...props} ref={ref}>
      <primitive object={scene} />
      {/* <skinnedMesh castShadow receiveShadow material={materials.Wood_diffuse} /> */}
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
    console.log(click, clickArmouryDrawingRoom, clickBilliardMusic,clickDrawingRoomArmoury, clickMusicBilliard, clickStartDrawingRoom)
  }}/>
  }

  function Portals_drawingRoom_armoury() {
    return <Dome_drawingRoom_armoury onClick={function start() {setPosition([79.6, 0, 80]); setClickDrawingRoomArmoury(true); setClickArmouryDrawingRoom(false)}}/>
  }

  function Portals_armoury_drawingRoom() {
    return <Dome_armoury_drawingRoom onClick={function start() {setPosition([60, 0, 58]); setClickArmouryDrawingRoom(true); setClickDrawingRoomArmoury(false)}}/>
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
      threeCamera.position.set(79.6, 0.1, 80);
    }
    if(clickArmouryDrawingRoom == true){
      threeCamera.position.set(60, 0.1, 57.4);
    }
  }, [click, clickMusicBilliard, clickBilliardMusic, clickStartDrawingRoom, clickDrawingRoomArmoury, clickArmouryDrawingRoom])
  
    
  
    

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
  return (
    <Canvas frameloop="demand" rotation={[0,0,0]} camera={threeCamera}>
      <Physics gravity={[0, -30, 0]}>
      <ambientLight intensity={4} />
      <OrbitControls makeDefault autoRotate target={position} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2}  rotateSpeed={-0.5}/>
      <Suspense fallback={null}>
        
        <Preload all />
        <Maison scale={1}  position={[0, 0, -5]}></Maison>
        <Maison2 scale={1} position={[20, -2, 20]}></Maison2>
        <Billiards_room scale={1} position={[38, -5, 40]}></Billiards_room>
        <SmallDrawingRoom scale={1} position={[60, -2, 60]}></SmallDrawingRoom>
        <Armoury scale={1} position={[80, -0.7, 80]}></Armoury>
        <DragoonOfficerSabre rotation={[0, Math.PI / -1.3, -4.5]} position={[79.5, 0, 79.05]} scale={0.001}></DragoonOfficerSabre>
        {/* <MyRotatingBox position={([0, 0, 0.1])} scale={0.02}></MyRotatingBox> */}
        <Key position={([0, 0, 0])} scale={0.009}></Key>
        {/* <Sabre></Sabre> */}
        {/* <Boite_tresor scale={0.1}  ></Boite_tresor> */}
        {/* <TheModel ></TheModel> */}
        {/* <Model position={[0,0, 0]} scale={0.1} /> */}
        {!click && clickStartDrawingRoom != true ? <Portals></Portals> : null}
        {click && clickMusicBilliard != true ? <Portals2></Portals2> : null}
        {!clickMusicBilliard && click != false ? <Portals_music_billard></Portals_music_billard> : null}
        {clickMusicBilliard ? <Portals_billard_music></Portals_billard_music> : null}
        {click == false && clickMusicBilliard == false && clickStartDrawingRoom == false  ? <Portals_start_drawingRoom></Portals_start_drawingRoom> : null}
        {clickStartDrawingRoom && clickDrawingRoomArmoury != true ? <Portals_drawingRoom_start></Portals_drawingRoom_start> : null}
        {clickDrawingRoomArmoury == false && clickStartDrawingRoom == true ? <Portals_drawingRoom_armoury></Portals_drawingRoom_armoury> : null}
        {clickDrawingRoomArmoury ? <Portals_armoury_drawingRoom></Portals_armoury_drawingRoom> : null}
      </Suspense>
      </Physics>
    </Canvas>
  )
}
