import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/key.glb"
import React from "react";
import { useFrame } from "@react-three/fiber";


export function Key(props) {
  function Model() {
    const { scene } = useGLTF(glb)
    
    return <Clone object={scene} />
  }
  const myMesh = React.useRef();    
  useFrame(({ clock }) => {
    
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });
  return (
    <group  ref={myMesh} {...props} dispose={null}>
    <Model></Model>
    </group>
  )
}

useGLTF.preload("/key.glb")