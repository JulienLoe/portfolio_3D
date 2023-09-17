import { Clone, useGLTF } from "@react-three/drei"
import glb from "./assets/the_small_drawing_room.glb"


export function SmallDrawingRoom(props) {
  
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

useGLTF.preload("/the_small_drawing-room.glb")