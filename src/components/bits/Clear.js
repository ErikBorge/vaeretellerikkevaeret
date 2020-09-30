import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

const Clear = ({weather}) => {
  const mesh = useRef(null);
  const [night, setNight] = useState( () => (weather.sunrise >= weather.time || weather.time >= weather.sunset) ? true : false );

  useEffect(() => {
    setNight(weather.sunrise >= weather.time || weather.time >= weather.sunset);
    if (mesh.current){
      (!night) ? (
        mesh.current.material.transparent = true,
        mesh.current.material.opacity = 1 - weather.clouds/500
      ): mesh.current.material.opacity = 1;
    }
  })

  useFrame(() => {
    (mesh.current) ? mesh.current.rotation.y += 0.002 : null;
    //mesh.current.rotation.x -= 0.005;
  });

  const moonTextureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg";
  const moonTexture = useMemo(() => new THREE.TextureLoader().load(moonTextureURL), [moonTextureURL]);
  const sunTextureURL = "https://raw.githubusercontent.com/fblupi/threejs-sun-earth-and-moon/master/res/sol.jpg";
  const sunTexture = useMemo(() => new THREE.TextureLoader().load(sunTextureURL), [sunTextureURL]);

  if(weather.main !== 'Rain') {
    return (
      <mesh ref={mesh} position={[0,0,-10]}>
        <sphereBufferGeometry attach='geometry' args={[3,100,20]}/>
          <meshPhongMaterial attach='material'>
            <primitive attach="map" object={night ? moonTexture : sunTexture} />
          </meshPhongMaterial>
          {/*<meshStandardMaterial attach='material' color={'orange'}/>*/}
      </mesh>
    )
  }
  else {
    return null;
  }
}

export default Clear;
