import { Html } from '@react-three/drei';
import { Popconfirm } from 'antd';
import React, { useState } from 'react';

export function Dome({ name, position, texture, onClick }) {
    
    const [clicked, setClicked] = useState(false)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture}  />
        </mesh>
        <mesh scale={clicked ? 1.1 : 1} position={[2, 0, 0.2]}>
          <sphereGeometry args={[0.2, 22, 22]} />
          <meshBasicMaterial color="white" />
          <Html center>
            <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
              <a id='link' href="#" onPointerOver={() => setClicked(true)} onPointerOut={() => setClicked(false)}>Salle de musique</a>
            </Popconfirm>
          </Html>
        </mesh>
      </group>
    )
  }

