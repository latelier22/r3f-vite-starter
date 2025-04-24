import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { OrbitControls } from "@react-three/drei";
import SousVerreBlanc from "./SousVerreBlanc.jsx";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const textures = [
  "/textures/art6.webp",
  "/textures/art5.webp",
  "/textures/art4.webp",
  "/textures/art3.webp",
  "/textures/art2.webp",
  "/textures/art1.webp",
];

const basePositions = [
  [0, 0, 0],
  [0.2, -0.3, -0.3],
  [0.4, -0.6, -0.6],
  [0.6, -0.9, -0.9],
  [0.8, -1.2, -1.2],
  [1, -1.5, -1.5],
];

const gridPositions = [
  [-0.5, 0, 0], [0.5, 0, 0],
  [-0.5, -0.6, 0], [0.5, -0.6, 0],
  [-0.5, -1.2, 0], [0.5, -1.2, 0],
];

export const Experience = forwardRef((props, ref) => {
  const refs = useRef([]);
  const [phase, setPhase] = useState("idle");
  const [stopped, setStopped] = useState(false);
  const clock = useRef(0);
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);

  useFrame((_, delta) => {
    if (stopped) return;

    clock.current += delta;

    if (phase === "idle" && clock.current > 2) {
      setPhase("slideToFront");
      clock.current = 0;
    }

    if (phase === "slideToFront") {
      const lastIndex = order[5];
      const last = refs.current[lastIndex];
      if (last) {
        const lateralTarget = new THREE.Vector3(-1, -1.5, -1.5);
        last.position.lerp(lateralTarget, 0.1);
        if (last.position.distanceTo(lateralTarget) < 0.05) {
          setPhase("moveToTop");
        }
      }
    }

    if (phase === "moveToTop") {
      const lastIndex = order[5];
      const last = refs.current[lastIndex];
      if (last) {
        const target = new THREE.Vector3(...basePositions[0]);
        last.position.lerp(target, 0.1);
        if (last.position.distanceTo(target) < 0.05) {
          const newOrder = [order[5], ...order.slice(0, 5)];
          setOrder(newOrder);
          setPhase("shiftOthers");
        }
      }
    }

    if (phase === "shiftOthers") {
      order.slice(1).forEach((idx, i) => {
        const ref = refs.current[idx];
        const target = new THREE.Vector3(...basePositions[i + 1]);
        if (ref) {
          ref.position.lerp(target, 0.1);
        }
      });

      const allClose = order.slice(1).every((idx, i) => {
        const ref = refs.current[idx];
        const target = new THREE.Vector3(...basePositions[i + 1]);
        return ref && ref.position.distanceTo(target) < 0.05;
      });

      if (allClose) {
        setPhase("idle");
        clock.current = 0;
      }
    }
  });

  const stopAnimation = () => {
    setStopped(true);
    order.forEach((idx, i) => {
      const ref = refs.current[idx];
      if (ref) {
        ref.position.set(...gridPositions[i]);
      }
    });
  };

  useImperativeHandle(ref, () => ({
    stopAnimation,
  }));

  return (
    <>
      <OrbitControls />
      {textures.map((textureUrl, i) => (
        <SousVerreBlanc
          key={`carre-${i}`}
          textureUrl={textureUrl}
          position={basePositions[i]}
          ref={(el) => (refs.current[i] = el)}
        />
      ))}
      <ambientLight intensity={3} />
      <directionalLight
        castShadow
        position={[5, 5, 5]}
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={10}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
    </>
  );
});
