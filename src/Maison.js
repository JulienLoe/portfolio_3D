import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/maison.glb"


export function Maison(props) {
  
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

useGLTF.preload("/maison.glb")