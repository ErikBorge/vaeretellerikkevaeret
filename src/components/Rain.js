import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'

// extend(meshline)


const maxY = 1.5;
const rainYSpeed = Math.random()+2;


const Point = ({wind}) => {
  const material = useRef()
  const mesh = useRef()
  const [color] = useState('#6394A5')

  const [position] = useState([Math.random()*2, Math.min(Math.random()*2,maxY), 0])


  // Hook into the render loop and decrease the materials dash-offset

  const { camera } = useThree()

  // camera.updateMatrix();
  // camera.updateMatrixWorld();
  // var frustum = new THREE.Frustum();
  // frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));


  camera.updateMatrix(); // make sure camera's local matrix is updated
  camera.updateMatrixWorld(); // make sure camera's world matrix is updated
  camera.matrixWorldInverse.getInverse( camera.matrixWorld );

  // plane.updateMatrix(); // make sure plane's local matrix is updated
  // plane.updateMatrixWorld(); // make sure plane's world matrix is updated

  var frustum = new THREE.Frustum();
  frustum.setFromProjectionMatrix( new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ) );
  // console.log(frustum);

  useFrame(() => {
    mesh.current.position.x -= 0.005*wind;
    mesh.current.position.y -= 0.005*rainYSpeed;
    if(mesh.current.position.y < -1){
      mesh.current.position.y = maxY;
      mesh.current.position.x = Math.random()*2;
    }

  })

  // useFrame(() => {
  //   camera.updateMatrix();
  //   camera.updateMatrixWorld();
  //   var frustum = new THREE.Frustum();
  //   frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
  //
  //   if (!frustum.containsPoint([mesh.current.position.x, mesh.current.position.y,0])) {
  //       // Do something with the position...
  //       console.log("outside of view")
  //   }
  // })
  return (
    <mesh ref={mesh} position={position}>
      {/** MeshLine and CMRCurve are a OOP factories, not scene objects, hence all the imperative code in here :-( */}
      {/*<meshLine onUpdate={self => (self.parent.geometry = self.geometry)}>
        <geometry onUpdate={self => self.parent.setGeometry(self)}>
          <catmullRomCurve3 args={[curve]} onUpdate={self => (self.parent.vertices = self.getPoints(500))} />
        </geometry>
      </meshLine>*/}
      {/** MeshLineMaterial on the other hand is a regular material, so we can just attach it */}
      {/*<meshLineMaterial attach="material" ref={material} transparent depthTest={false} lineWidth={width} color={color} dashArray={0.1} dashRatio={ratio} />*/}
      <sphereBufferGeometry attach="geometry" args={[0.05,20,20]}/>
      <meshStandardMaterial attach="material" ref={material} color={color}/>
    </mesh>
  )
}

const Scene = () => {
  let group = useRef()

  return (

    <mesh>
      <sphereBufferGeometry attach="geometry" args={[0.05,20,20]}/>
      <meshStandardMaterial attach="material" color={"orange"}/>
    </mesh>

  )
}

const Rain = (props) => {
  let group = useRef();

  const {name, icon, main, temp, wind, clouds, rain, time, timezone} = props.weather;
  const numPoints = Math.round(10*rain);
  console.log(Math.round(numPoints));
  const points = new Array(numPoints).fill();
  if (points && points.length > 0) {
    return (
      <group ref={group}>
        {points.length > 0 && points.map((_, index) => (
          <Point key={index} wind={wind}/>
        ))}
      </group>
    )
  }
  else{
    return null;
  }
}

// const Rain = () => {
//   return (
//     <div className="main">
//       <Canvas
//         style={{ background: '#324444' }}
//         camera={{ position: [0, 0, 20], fov:20 }}>
//         <ambientLight intensity={0.4}/>
//         <pointLight position={[-10,0,-20]} intensity={0.5}/>
//         <directionalLight
//           position={[-5, 0, 0]}
//           intensity={1}
//           shadow-mapSize-width={1024}
//           shadow-mapSize-height={1024}
//           // shadow-camera-right={50}
//         />
//         <Scene2 />
//       </Canvas>
//
//     </div>
//   )
// }

export default Rain;
