import React, { useRef, useState } from "react";
import {
  OrbitControls,
  Environment,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import { useControls } from "leva";
import Iphone3D from "../component/3D/Iphone13";

const calculatePositions = (num, radius) => {
  const positions = [];
  const angleIncrement = (2 * Math.PI) / num;

  for (let i = 0; i < num; i++) {
    const angle = i * angleIncrement;
    const x = radius * Math.sin(angle);
    const z = radius * Math.cos(angle);
    const rotationY = angle + Math.PI; // Rotate to face the center
    positions.push({ x, z, rotationY });
  }

  return positions;
};

export const Experience = ({ cameraRef }) => {
  const groupRef = useRef();

  const { cameraX, cameraY, cameraZ, number, radius } = useControls({
    cameraX: { value: -10, min: -40, max: 40, step: 0.1 },
    cameraY: { value: 4, min: -10, max: 10, step: 0.1 },
    cameraZ: { value: 15, min: -40, max: 40, step: 0.1 },
    number: { value: 7, min: 1, max: 40, step: 1 },
    radius: { value: 5, min: 1, max: 40, step: 0.1 },
  });

  const positions = calculatePositions(number, radius);

  const { rotation } = useSpring({
    from: { rotation: 0 },
    to: async (next) => {
      for (let i = 0; i < number; i++) {
        await next({ rotation: i * ((2 * Math.PI) / number) });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause
      }
    },
    config: { duration: 1000 },
    reset: true,
    loop: true,
  });

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(cameraX, cameraY, cameraZ);
      cameraRef.current.lookAt(0, 0, 0); // Make the camera always look at the center
    }
  });

  return (
    <>
      <Environment preset="city" />
      <OrbitControls enableZoom enableRotate enablePan />
      <animated.group ref={groupRef} rotation-y={rotation}>
        {positions.map((pos, index) => (
          <Iphone3D
            key={index}
            position-x={pos.x}
            position-y={0.4}
            position-z={pos.z}
            rotation-y={pos.rotationY}
          />
        ))}
      </animated.group>
      <mesh position-y={-0.5} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={0.1}
          depthScale={1}
          opacity={0.9}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
    </>
  );
};
