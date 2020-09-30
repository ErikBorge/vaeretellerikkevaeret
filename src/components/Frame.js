import React, { useRef, useMemo, useEffect, useState } from 'react';

import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import Rain from './bits/Rain';
import Clouds from './bits/Clouds';
import Clear from './bits/Clear';


const Frame = (props) => {
  // console.log(weather);
  const {main, wind, rain, clouds} = props.weather;
  // console.log(`clouds: ${clouds}`);
  // console.log(`main: ${main}`);
  return (
    <>
      <Canvas
        className="frame__canvas"
        colorManagement
        camera={{position: [0, 0, 10], fov: 20}}
        //camera={{position: [-5, 2, 10], fov: 20}}
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
        {/* (main === 'Clear') ? <Sun />
        : (main === 'Rain') ? <Rain />
        :*/}

        <Clouds weather={props.weather}/>
        <Rain weather={props.weather}/>
        <Clear weather={props.weather} />
      </Canvas>
    </>
  );
}

export default Frame;
