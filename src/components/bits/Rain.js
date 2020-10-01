import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'

const Rain = (props) => {
  let group = useRef();

  const {name, icon, main, temp, wind, clouds, rain, time, timezone} = props.weather;
  const numPoints = Math.round(10*rain);
  const points = new Array(numPoints).fill();

  if (points && points.length > 0) {
    return (
      <group ref={group}>
        {points.map((_, index) => (
          <RainDrop key={index} wind={wind}/>
        ))}
      </group>
    )
  }
  else{
    return null;
  }
}

export default Rain;


const RainDrop = ({wind}) => {
  const mesh = useRef()

  //frustum is [+-1.8, +-1.8].
  const maxY = 1.8;
  const maxX = 3;
  const rainYSpeed = Math.random()+5;
  const position = [Math.random()*maxX*2-maxX, Math.random()*maxY*2-maxY, Math.round(Math.random())]

  useFrame(() => {
    mesh.current.position.x -= 0.005*wind;
    mesh.current.position.y -= 0.005*rainYSpeed;
    if(mesh.current.position.y < -2){
      mesh.current.position.y = maxY;
      mesh.current.position.x = Math.random()*maxX*2-maxX;
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereBufferGeometry attach="geometry" args={[0.05,20,20]}/>
      <meshStandardMaterial attach="material" color={'#6394A5'}/>
    </mesh>
  )
}
