import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <Canvas shadows camera={{ position: [-10, 4, 15], fov: 30 }}>
      <color attach="background" args={["#000022"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
