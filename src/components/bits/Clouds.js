import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

import Cloud1 from '../../assets/cloud.png';
import Cloud2 from '../../assets/cloud2.png';

const Clouds = ({weather}) => {
  //max 10 clouds
  const numClouds = Math.round(weather.clouds/10);
  const cloudArr = new Array(numClouds).fill();

  if (cloudArr && cloudArr.length > 0) {
    return (
      <group>
        {cloudArr.map((_, index) => (
          <Cloud key={index} />
        ))}
      </group>
    )
  }
  else {
    return null;
  }
}

export default Clouds;

const Cloud = () => {
  const mesh = useRef(null);

  //load the cloud images into cloudImages
  const cloud1 = useMemo((res) => new THREE.TextureLoader().load(Cloud1), [Cloud1]);
  const cloud2 = useMemo((res) => new THREE.TextureLoader().load(Cloud2), [Cloud2]);
  const cloudImages = [cloud1, cloud2];

  //constants for cloud size and position
  const cloudWidth = Math.random()*(2.5-1)+1;
  const cloudSize = [cloudWidth, cloudWidth];
  //Frustum is +-1.8 large
  const cloudMinX = -1.6+cloudWidth/2;
  const cloudMaxX = 1.6-cloudWidth/2;
  const cloudPosition = [Math.random()*(cloudMaxX-cloudMinX)+cloudMinX, Math.random()*(cloudMaxX-cloudMinX)+cloudMinX,1];
  const cloudRotation = Math.random()*Math.PI*2;

  return (
    <mesh ref={mesh} position={cloudPosition} rotation={[0,0,cloudRotation]}>
      <planeBufferGeometry attach="geometry" args={cloudSize}/>
      <meshLambertMaterial attach="material" transparent>
        <primitive attach="map" object={cloudImages[Math.round(Math.random())]} />
      </meshLambertMaterial>
    </mesh>
  )
}
