import { OrbitControls, Environment , MeshReflectorMaterial} from "@react-three/drei";

import Iphone3D from "../component/3D/Iphone13"

export const Experience = () => {
  return (
    <>
    <Environment preset="city" />
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <Iphone3D position-y={0.4 } rotation-y={Math.PI}/>
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
