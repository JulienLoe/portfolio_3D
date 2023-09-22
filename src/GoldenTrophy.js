import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/ornate_book.glb"
import React from "react";
import { useFrame } from "@react-three/fiber";


export function GoldenTrophy(props) {
  function Model() {
    const { scene } = useGLTF(glb)
    
    return <Clone object={scene} />
  }
  const myMesh = React.useRef();    
  useFrame(({ clock }) => {
    
    const a = clock.getElapsedTime();
    myMesh.current.rotation.y = a;
  });
  return (
    <group  ref={myMesh} {...props} dispose={null}>
    <Model></Model>
    </group>
  )
}

useGLTF.preload("/ornate_book.glb")