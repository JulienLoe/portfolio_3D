import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/dragoon_officers_sabre.glb"
import { useState } from "react"
import { Key } from "./Key"


export function DragoonOfficerSabre(props) {
  const [clickSabre, setClickSabre] = useState(false)
  function Model() {
    const { scene } = useGLTF(glb)
    
    return <Clone object={scene} />
  }

  return (
    <group onClick={()=> {setClickSabre(true); console.log(clickSabre)}} {...props} dispose={null}>
    <Model></Model>
    </group>
  )
}

useGLTF.preload("/dragoon_officers_sabre.glb")