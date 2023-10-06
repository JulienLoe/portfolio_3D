import { useAnimations, useGLTF } from '@react-three/drei';
import React from 'react';
import { useEffect } from 'react';
import animationGLB from './assets/treasure_chest.glb'
import * as THREE from 'three'

 function Model({key, setKey, openBox, tresorBoolean, props, setOpenBox, setTresor, setKeyBox, keyBox, setTresorBoolean}) {
  
    
    // let mixer = null;
    
    
    const { nodes, materials, animations, scene , obj} = useGLTF(animationGLB)
    // animations.setLoop(THREE.LoopOnce)
    
    const { ref, actions, names } = useAnimations(animations)
   
    // mixer = new THREE.AnimationMixer(scene);
    
    useEffect(() => {
      if(openBox == true && keyBox == true){
      let animation = actions[names[0]].play()
      animation.setLoop(THREE.LoopOnce)
      setTimeout(() =>{setKeyBox(false)}, 1000)
      }
    },[tresorBoolean, openBox, keyBox]);
    
    return (
      <>
      <group {...props} onClick={()=>{ console.log(keyBox); setOpenBox(true);
      if(keyBox === true){setTresor([36, 0, 46]); setTresorBoolean(true)}; 
      setTimeout(() => {setOpenBox(false)}, 1000);}
      } position={[32, -1.9, 40.5]} ref={ref} scale={0.01} rotation={[1.55, Math.PI / 1, -1.8]} >
              <primitive  object={nodes.top_01}/>
              <primitive  object={nodes.root_00}/>
              <primitive  object={nodes._rootJoint}/>
        
        <skinnedMesh  receiveShadow castShadow skinning  geometry={nodes.Object_10.geometry} skeleton={nodes.Object_10.skeleton} material={materials.M_Chest_Reinforcment}/>
        <skinnedMesh  receiveShadow castShadow skinning  geometry={nodes.Object_11.geometry} skeleton={nodes.Object_11.skeleton} material={materials.M_Chest_Wood}/>
      </group>
      </>
    )
  }
export default Model
  useGLTF.preload(animationGLB)