import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useRef } from "react";

function App() {
  const cameraRef = useRef();

  return (
    <Canvas shadows camera={{ position: [-10, 4, 30], fov: 30 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
      <color attach="background" args={["#EEEEFF"]} />
      <Experience cameraRef={cameraRef} />
    </Canvas>
  );
}

export default App;
