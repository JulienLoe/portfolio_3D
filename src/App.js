import * as THREE from 'three'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'
import { Popconfirm } from 'antd'
import {Maison} from "./Maison"
import {Maison2} from "./Maison2"

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
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={[2, 0, 0.2]}>
        <sphereGeometry args={[0.10, 22, 22]} />
        <meshBasicMaterial color="white" />
        <Html center>
          <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
            <a href="#">Salle de musique</a>
          </Popconfirm>
        </Html>
      </mesh>
    </group>
  )
}

function Dome2({ name, position, texture, onClick }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={[21, 0, 21]}>
        <sphereGeometry args={[0.10, 22, 22]} />
        <meshBasicMaterial color="white" />
        <Html center>
          <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
            <a href="#">Salle à manger</a>
          </Popconfirm>
        </Html>
      </mesh>
    </group>
  )
}

export default function App() {
  const [click, setClick] = useState(false)
  const [position, setPosition] = useState([0, 0, 0]);
  const threeCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  threeCamera.position.set(0, 0, -0.1);

  function Portals() {
    return <Dome onClick={function start() {setPosition([20, 0, 20]); setClick(!click)}}/>
  }

  function Portals2() {
    return <Dome2 onClick={function start() {setPosition([0, 0, 0]); setClick(!click)}}/>
  }

  useEffect(()=>{
    if(click == true){
      threeCamera.position.set(20, 0.1, 20.6);
    }
    
  }, [click])
  return (
    <Canvas frameloop="demand" rotation={[0,0,0]} camera={threeCamera}>
      <OrbitControls target={position} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5}/>
      <Suspense fallback={null}>
        <Preload all />
        <Maison scale={1}  position={[0, 0, -5]}></Maison>
        <Maison2 scale={1} position={[20, -2, 20]}></Maison2>
        {!click ? <Portals></Portals> : null}
        {click ? <Portals2></Portals2> : null}
      </Suspense>
    </Canvas>
  )
}
