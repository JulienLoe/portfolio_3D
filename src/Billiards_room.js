import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/the_billiards_room.glb"


export function Billiards_room(props) {
  
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

useGLTF.preload("/the_billiards_room.glb")