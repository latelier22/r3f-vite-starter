import React, { useRef, useState, Suspense, useMemo } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'

export function Model(props) {
  const { nodes, materials } = useGLTF('/modeles3D/IPHONE13.glb')
  const videoTexture = useVideoTexture('/textures/iphone13.mp4') // Assurez-vous que ce chemin est correct
  videoTexture.wrapS = THREE.RepeatWrapping
  videoTexture.wrapT = THREE.RepeatWrapping
  
  videoTexture.repeat.x = -1
  videoTexture.offset.x = 0.8
  videoTexture.rotation = -Math.PI / 2 // Rotate 90 degrees (PI / 2 radians)
  videoTexture.center.set(0.5, 0.5) // Set the rotation center to the middle of the texture

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAM_EYE.geometry}
        material={materials['cam eye']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAM_BASE.geometry}
        material={materials['cam base']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAMERA_RING.geometry}
        material={materials.side}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAM_EYE001.geometry}
        material={materials['cam eye']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAMERA_RING001.geometry}
        material={materials.side}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAM_EYE002.geometry}
        material={materials['cam eye']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAMERA_RING002.geometry}
        material={materials.side}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAMGLASS.geometry}
        material={materials['cam ']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAM_GLASS001.geometry}
        material={materials['cam ']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAM_GLASS.geometry}
        material={materials['cam ']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SENSOR.geometry}
        material={materials['cam ']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FLASH_LIGHT.geometry}
        material={materials.flash}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.F_CAM.geometry}
        material={materials['cam base']}
        position={[0, 0, -0.006]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Apple_logo.geometry}
        material={materials['Material.030']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SENSOR001.geometry}
        material={materials['cam eye']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MAIN_BODY.geometry}
        material={materials.side}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SCREEN.geometry}
      >
        <meshStandardMaterial map={videoTexture} toneMapped={false} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FRONT_RING.geometry}
        material={materials['f ring']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BACK_COVER.geometry}
        material={materials.back}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b1.geometry}
        material={materials['cam base']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b2.geometry}
        material={materials['cam base']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b3.geometry}
        material={materials['cam base']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b4.geometry}
        material={materials['cam base']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b5.geometry}
        material={materials['cam base']}
      />
    </group>
  )
}

export default Model;

useGLTF.preload('/modeles3D/IPHONE13.glb')
