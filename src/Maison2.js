import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/maison2.glb"


export function Maison2(props) {
  
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

useGLTF.preload("/maison2.glb")