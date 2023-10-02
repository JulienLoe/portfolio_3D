import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/fantastic_castle.glb"
import React from "react"
import { useFrame } from "@react-three/fiber"


export function Castle(props) {
  
    function Model() {
        const { scene } = useGLTF(glb)
        
        return <Clone object={scene} />
      }
    
      return (
        <group {...props} dispose={null}>
        <Model></Model>
        </group>
      )
}

useGLTF.preload("/fantastic_castle.glb")