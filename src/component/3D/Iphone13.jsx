import React, { useRef, useState, Suspense, useMemo } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { Html,useGLTF, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three'

import { degToRad, lerp } from "three/src/math/MathUtils";



const OverlayItem = ({
  className = "",
  title,
  description,
  price,
  bgColor,
  ...props
}) => {
  const currentPage = "store"
  return (
    <Html
      transform
      distanceFactor={1.2}
      center
      className={`w-48 rounded-md overflow-hidden ${
        currentPage === "store" ? "" : "opacity-0"
      } transition-opacity duration-1000 ${className}`}
      {...props}
    >
      <div className="bg-white bg-opacity-50 backdrop-blur-lg text-xs p-2 w-full">
        <h2 className="font-bold">{title}</h2>
        <p>{description}</p>
      </div>
      <button
        className={`${bgColor} hover:bg-opacity-50 transition-colors duration-500 px-4 py-2 font-bold text-white w-full text-xs`}
      >
        Commander ${price}
      </button>
    </Html>
  );
};

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
      <OverlayItem
              position-x={-1}
              position-y={0}
              position-z={0.1}
              rotation-y={degToRad(180)}
              title={"Backpack"}
              description={"Ideal for camping and storing your belongings."}
              price={"49.99"}
              bgColor={"bg-green-500"}
              className={"transition delay-300"}
            />
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
