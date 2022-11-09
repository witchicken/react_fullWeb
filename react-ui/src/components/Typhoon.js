import React, { Suspense } from "react";

import "./css/Typhoon.scss";

import test from "../material/test.gltf";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//just load Poimandres.gltf
const Model = () => {
  const gltf = useLoader(GLTFLoader, test);
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  );
};

function Typhoon() {
  return (
    <div className="TyphoonCompo">
      <div className="innerCircle">just load gltf</div>
      <div className="typhoon">
        <Canvas>
          <Suspense fallback={null}>
            <Model />
            <OrbitControls />
            <Environment preset="sunset" background />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Typhoon;
