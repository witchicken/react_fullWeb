import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./css/Night.scss";
import { ReactComponent as Man } from "../svg/man.svg";

import { Scene, Sun } from "./threeCompo/Scene.js";

function Night() {
  return (
    <div className="NightCompo">
      <div className="innerCircle">
        <Canvas
          camera={{ fov: 35, near: 0.1, far: 1000, position: [0, 0, 20] }}
        >
          <Suspense fallback={null}>
            <Sun />
            <OrbitControls autoRotate />
          </Suspense>
        </Canvas>
      </div>
      <div className="solarsystem">
        <Canvas
          camera={{ fov: 120, near: 0.1, far: 1000, position: [0, 0, 40] }}
        >
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls autoRotate />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Night;
