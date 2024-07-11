import React, { useRef, useEffect, useState } from "react";
import {
  OrbitControls,
  Environment,
  MeshReflectorMaterial,
  PerspectiveCamera
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";
import Iphone3D from "../component/3D/Iphone13";
import S11 from "../component/3D/S11";

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

export const Experience = () => {
  const cameraRef = useRef();
  const groupRef = useRef();
  const [videoUrl, setVideoUrl] = useState(null);

  const { animate, cameraX, cameraY, cameraZ, number, radius, fov } = useControls({
    number: { value: 7, min: 1, max: 40, step: 1 },
    radius: { value: 5, min: 1, max: 40, step: 0.1 },
    animate: { value: true, label: "Animate" },
    cameraX: { value: 0, min: -40, max: 40, step: 0.1 },
    cameraY: { value: 5, min: -10, max: 10, step: 0.1 },
    cameraZ: { value: 20, min: -40, max: 40, step: 0.1 },
    fov: { value: 50, min: 10, max: 120, step: 0.1 },
  });

  const positions = calculatePositions(number, radius);

  const [springProps, setSpring] = useSpring(() => ({
    rotation: 0,
    config: { duration: 1000 },
    reset: true,
    loop: true,
  }));

  useEffect(() => {
    if (animate) {
      setSpring.start({
        from: { rotation: 0 },
        to: async (next) => {
          for (let i = 0; i < number; i++) {
            await next({ rotation: i * ((2 * Math.PI) / number) });
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause
          }
        },
      });
    } else {
      setSpring.stop();
    }
  }, [animate, number, setSpring]);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(cameraX, cameraY, cameraZ);
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix(); // Update the projection matrix when fov changes
    }
  });

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const response = await fetch(process.env.REACT_APP_STRAPI_PUBLIC_API_URL);
      const data = await response.json();
      if (data?.data?.[0]?.attributes?.url) {
        setVideoUrl(data.data[0].attributes.url);
      }
    };

    fetchVideoUrl();
  }, []);

  if (!videoUrl) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Environment preset="city" />
      <PerspectiveCamera ref={cameraRef} makeDefault position={[cameraX, cameraY, cameraZ]} fov={fov} />
      <OrbitControls enableZoom enableRotate enablePan />
      <animated.group ref={groupRef} rotation-y={springProps.rotation}>
        {positions.map((pos, index) => (
          <Iphone3D
            key={index}
            positionX={pos.x}
            positionY={0.4}
            positionZ={pos.z}
            rotationY={pos.rotationY}
            videoUrl={videoUrl}  // Pass the video URL as a prop
          />
        ))}
        <S11 />
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

export default Experience;
