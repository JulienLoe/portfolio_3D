import { Html, Sphere } from '@react-three/drei';
import { Popconfirm } from 'antd';
import React, { useState } from 'react';

export function Dome({ name, position, texture, onClick, props }) {
    
    const [clicked, setClicked] = useState(false)
    return (
        <Sphere position={[2, 0, 0.2]} args={[0.2, 22, 22]}></Sphere>
      
    )
  }

