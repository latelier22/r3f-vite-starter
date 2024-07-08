import {
  OrbitControls,
  Environment,
  MeshReflectorMaterial,
  Text,
} from "@react-three/drei";

import { degToRad, lerp } from "three/src/math/MathUtils";

import Iphone3D from "../component/3D/Iphone13"

export const Experience = () => {
  return (
    <>
      <Environment preset="city" />
      <OrbitControls />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
      <Iphone3D position-y={0.4} rotation-y={Math.PI} />
      <Text
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
            </Text>
      <Iphone3D position-x={5} position-y={0.4} rotation-y={Math.PI} rotation-x={-Math.PI / 8} />
      <Iphone3D position-x={-5} position-y={0.4} rotation-y={Math.PI} rotation-z={Math.PI / 2} />
      <group position-z={-5} rotation-y={Math.PI} >

        <Iphone3D position-y={0.4} rotation-y={Math.PI} />
        <Iphone3D position-x={5} position-y={0.4} rotation-y={Math.PI} rotation-x={-Math.PI / 8} />
        <Iphone3D position-x={-5} position-y={0.4} rotation-y={Math.PI} rotation-z={Math.PI / 2} />
      </group>
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
