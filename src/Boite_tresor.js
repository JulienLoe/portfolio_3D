import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/treasure_chest.glb"


export function Boite_tresor(props) {
  
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

useGLTF.preload("/treasure_chest.glb")