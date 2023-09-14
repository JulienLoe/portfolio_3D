import * as THREE from 'three'
import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'
import { Popconfirm } from 'antd'
import {Maison} from "./Maison"
import {Maison2} from "./Maison2"

const store = [
  { name: 'Salle de musique', color: 'lightpink', position: [10, 0, -15], url: '/2294472375_24a3b8ef46_o.jpg', link: 1 },
  { name: 'inside', color: 'lightblue', position: [15, 0, 0], url: '/Photosphere1.jpg', link: 0 }
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
            <a href="#">{name}</a>
          </Popconfirm>
        </Html>
      </mesh>
    </group>
  )
}

function Portals() {
  const [which, set] = useState(0)
  const { link, ...props } = store[which]
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />
}

export default function App() {
  return (
    <Canvas frameloop="demand" camera={{ position: [100, 0, 95] }}>
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
      <Suspense fallback={null}>
        <Preload all />
        <Maison scale={1} position={[0, 0, -5]}></Maison>
        <Maison2 scale={1} position={[100, 0, 100]}></Maison2>
        <Portals></Portals>
      </Suspense>
    </Canvas>
  )
}
