import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import sunMap from "../../material/2k_sun.jpg";
import merquryMap from "../../material/2k_mercury.jpg";
import venusMap from "../../material/2k_venus_surface.jpg";
import earthMap from "../../material/2k_earth_daymap.jpg";
import marsMap from "../../material/2k_mars.jpg";
import jupiterMap from "../../material/2k_jupiter.jpg";
import saturnMap from "../../material/2k_saturn.jpg";
import uranusMap from "../../material/2k_uranus.jpg";
import neptuneMap from "../../material/2k_neptune.jpg";

export function Scene() {
  const [
    merquryTexMap,
    venusSurMap,
    earthTexMap,
    marsTexMap,
    jupiterTexMap,
    saturnTexMap,
    uranusTexMap,
    neptuneTexMap,
  ] = useLoader(TextureLoader, [
    merquryMap,
    venusMap,
    earthMap,
    marsMap,
    jupiterMap,
    saturnMap,
    uranusMap,
    neptuneMap,
  ]);
  return (
    <>
      <ambientLight intensity={1} />
      <mesh position={[0, 7, 20]}>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial map={merquryTexMap} />
      </mesh>
      <mesh position={[0, 10, 25]}>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1.5, 100, 100]} />
        <meshStandardMaterial map={venusSurMap} />
      </mesh>
      <mesh position={[0, 13, 30]}>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1.5, 100, 100]} />
        <meshStandardMaterial map={earthTexMap} />
      </mesh>
      <mesh position={[0, 16, 35]}>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial map={marsTexMap} />
      </mesh>
      <mesh position={[0, 19, 40]}>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[2.5, 100, 100]} />
        <meshStandardMaterial map={jupiterTexMap} />
      </mesh>
      <mesh position={[0, 22, 45]}>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[2, 100, 100]} />
        <meshStandardMaterial map={saturnTexMap} />
      </mesh>
      <mesh position={[0, 25, 50]}>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1.5, 100, 100]} />
        <meshStandardMaterial map={uranusTexMap} />
      </mesh>
      <mesh position={[0, 28, 55]}>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1.5, 100, 100]} />
        <meshStandardMaterial map={neptuneTexMap} />
      </mesh>
    </>
  );
}

export function Sun() {
  const [sunTexMap] = useLoader(TextureLoader, [sunMap]);
  return (
    <>
      <ambientLight intensity={1} />
      <mesh position={[0, 0, 0]}>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[5, 100, 100]} />
        <meshStandardMaterial map={sunTexMap} />
      </mesh>
    </>
  );
}
