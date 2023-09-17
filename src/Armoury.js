import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/the_armoury.glb"


export function Armoury(props) {
  
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

useGLTF.preload("/the_armoury.glb")