import React, { useRef, useMemo } from 'react';

import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';

import CloudImg from '../assets/cloud.png';
import RaindropImg from '../assets/raindrop.png';

const Sun = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh ref={mesh}>
      <sphereBufferGeometry attach='geometry' args={[1.5,20,20]}/>
      <meshStandardMaterial attach='material' color={'orange'}/>
    </mesh>
  )
}

const Cloud = () => {
  //const mesh = useRef(null);
  // const loadManager = new THREE.LoadingManager();
  // const loader = new THREE.ImageLoader();
  // loader.load()
  const cloud = useMemo(() => new THREE.TextureLoader().load(CloudImg), [CloudImg]);
  // const [cloud] = useLoader(THREE.ImageLoader, [CloudImage]);
  //useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[4, 4]} position={[10,10]}/>
      <meshLambertMaterial attach="material" transparent>
        <primitive attach="map" object={cloud} />
      </meshLambertMaterial>
    </mesh>
  )
}

const Rain = () => {
  const rain = useMemo(() => new THREE.TextureLoader().load(RaindropImg), [RaindropImg]);

  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[4, 4]}/>
      <meshLambertMaterial attach="material" transparent>
        <primitive attach="map" object={rain} />
      </meshLambertMaterial>
    </mesh>
  )
}

const Frame = ({weather}) => {
  console.log(weather);


  return (
    <>
      <Canvas
        className="frame__canvas"
        colorManagement
        camera={{position: [-5, 2, 10], fov: 20}}
      >
        <ambientLight intensity={0.4}/>
        <pointLight position={[-10,0,-20]} intensity={0.5}/>
        <directionalLight
          position={[-5, 0, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          // shadow-camera-right={50}
        />
        { (weather === 'Clear') ? <Sun />
        : (weather === 'Rain') ? <Rain />
        : <Cloud />
        }
      </Canvas>
    </>
  );
}

export default Frame;
