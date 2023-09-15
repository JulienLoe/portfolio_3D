import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/boite_tresor.glb"


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

useGLTF.preload("/boite_tresor.glb")