import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useRef } from "react";

function App() {
  const experienceRef = useRef();

  const handleStop = () => {
    if (experienceRef.current) {
      experienceRef.current.stopAnimation();
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience ref={experienceRef} />
      </Canvas>
      <button
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          padding: "0.5em 1em",
        }}
        onClick={handleStop}
      >
        Stop & Arrange in Grid
      </button>
    </div>
  );
}

export default App;
