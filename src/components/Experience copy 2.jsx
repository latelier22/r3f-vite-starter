import {
  OrbitControls,
  Environment,
  MeshReflectorMaterial,
  Text,
} from "@react-three/drei";

import { degToRad } from "three/src/math/MathUtils";

import Iphone3D from "../component/3D/Iphone13"

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

export const Experience = ({ number = 7 }) => {
  const radius = 1;
  const positions = calculatePositions(number, number * radius);

  return (
    <>
      <Environment preset="city" />
      <OrbitControls />
      {/* <Text
        font={"fonts/Poppins-Black.ttf"}
        position-x={1}
        position-y={0}
        position-z={0.1}
        lineHeight={0.8}
        textAlign="center"
        rotation-y={degToRad(0)}
        anchorY={"bottom"}
        color={'white'}
        scale={0.4}
      >
        iPhone 13
      </Text>
      <Text
        font={"fonts/Poppins-Black.ttf"}
        position-x={1}
        position-y={-0.5}
        position-z={0.1}
        lineHeight={0.8}
        textAlign="left"
        rotation-y={degToRad(0)}
        anchorY={"bottom"}
        color={'white'}
        scale={0.3}
      >
        Réparation écran
      </Text> */}
      {positions.map((pos, index) => (
        <Iphone3D
          key={index}
          position-x={pos.x}
          position-y={0.4}
          position-z={pos.z}
          rotation-y={pos.rotationY}
        />
      ))}
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
