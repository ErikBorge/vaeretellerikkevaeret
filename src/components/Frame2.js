// This is just a sketching file. it's not in use

import React, { useRef, useState, useMemo, useEffect } from 'react';

import { Canvas, useFrame, useLoader, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';
import flatten from 'lodash/flatten'
// import SVGLoader from '../utilities/SVGLoader';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

import CircleImg from '../assets/circle.svg';

const randomshapepath = <svg xmlns="http://www.w3.org/2000/svg"><path d="M208.033124,86.5702883 C229.107153,92.0484463 216.098167,68.2960058 228.633225,65.3116063 C238.589901,62.9410788 230.637725,69.8592581 238.678014,72.6499149 C243.195117,74.2177297 248.435587,71.3895336 253.002757,72.8008587 C264.843247,76.4597499 252.098463,81.0497027 251.864247,83.8548244 C251.423442,89.1341959 260.375599,97.5537589 255.445433,99.3303764 L252.513319,106.139619 C244.674102,108.964532 234.50202,95.8928451 231.099996,98.6534163 C225.633014,103.089597 222.799006,110.374882 217.150238,114.571127 C215.864319,115.526386 212.576343,113.590094 213.063048,112.052347 L212.441085,106.47505 C217.886265,89.2709824 225.169174,96.8463116 208.596355,89.1134627 L208.033124,86.5702883 Z" id="Path"></path></svg>

// const svgpoints = new Promise(resolve =>
//   new SVGLoader().load(RandomShapeImg, shapes => {
//     // console.log(shapes.paths[0].subPaths[0].curves[0].getPoints(20)),
//     // resolve(flatten(shapes.paths.map((group, index) => group.toShapes(true).map(shape => ({ shape, color: group.color, index })))))
//     // resolve(shapes.paths.getPoints())
//     resolve(shapes.paths[0].subPaths[0].curves[0].getPoints(20))
//   })
// )

const svgpoints = new Promise(resolve =>
  new SVGLoader().load(CircleImg, shapes => {
    // console.log(shapes.paths[0].subPaths[0].curves[0].getPoints(20)),
    // resolve(flatten(shapes.paths.map((group, index) => group.toShapes(true).map(shape => ({ shape, color: group.color, index })))))
    // resolve(shapes.paths.getPoints())
    resolve(shapes.paths[0].subPaths[0].curves[0].getPoints(20))
  })
)

const Circle = () => {
  //   const circle = useMemo(() => new SVGLoader().load(CircleImg, function (data) {
  //     var paths = data.paths;
  //     var path = new THREE.Path(data);
  //
  //     var points = path.getPoints(5);
  //     console.log(points);
  //     var group = new THREE.Group();
  //
  // 		for ( var i = 0; i < paths.length; i ++ ) {
  //
  // 			var path = paths[ i ];
  //
  // 			var material = new THREE.MeshBasicMaterial( {
  // 				color: path.color,
  // 				side: THREE.DoubleSide,
  // 				depthWrite: false
  // 			} );
  //
  // 			var shapes = path.toShapes( true );
  //
  // 			for ( var j = 0; j < shapes.length; j ++ ) {
  //
  // 				var shape = shapes[ j ];
  // 				var geometry = new THREE.ShapeBufferGeometry( shape );
  // 				var mesh = new THREE.Mesh( geometry, material );
  // 				group.add( mesh );
  //
  // 			}
  //
  // 		}
  //   },
  //   function ( xhr ) {
  // 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  // 	},
  //   function ( error ) {
  // 		console.log( 'An error happened' );
  // 	}
  // ));
  useEffect(() => {
    svgpoints.then(res => setPoints(res));
  });

  const [points, setPoints] = useState({});

  // console.log(points);

  // circle.getPoints(10);
  return (
      <>
        { points && points[0] ?
          points.map((coordinates, key) => {
            // console.log(coordinates);
            return (
              <Point position={coordinates} />
            )
          })
          : null
        }

      </>
  )
}

const RandomShape = () => {
  const [points, setPoints] = useState({});
  // var len = randomshapepath.getTotalLength();
  // console.log(randomshapepath);
  // console.log(randomshapepath.props.children.props);
  // console.log(randomshapepath.props.children.props.d.getTotalLength());

  return (
    <>
      { points && points[0] ?
        points.map((coordinates, key) => {
          // console.log(coordinates);
          return (
            <Point position={coordinates} />
          )
        })
        : null
      }

    </>
  )
}

const Shape = () => {
  const points = []; //[{ x: 1, y: 1 }, {x: 0, y: 0,}, {x: 1, y: 0}, {x: 0, y: 1}];
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  //points.push(new THREE.Point());
  // console.log(points);
  const size = 0.1;
  const mesh = useRef(null);
  // useFrame(() => {
  //
  //   mesh.current.position.x = x;
  //   mesh.current.position.y = y;
  // });
  const changePos = () => {
    console.log("hello");
    if (mesh.current.position.x === 1) {
      mesh.current.position.x = 0;
    }
    else{
      mesh.current.position.x = 1;
    }
    if (mesh.current.position.y === 1) {
      mesh.current.position.y = 0;
    }
    else{
      mesh.current.position.y = 1;
    }
  }
  // setInterval(() => {
  //   (x === 0)? setX(1)
  //   : setX(0);
  //   (y === 0) ? setY(1)
  //   : setY(0);
  //
  // }, 1000)

  return (
    <mesh ref={mesh} onClick={changePos}>
      <boxBufferGeometry attach="geometry" args={[0.1,0.1,0]} />
      <meshStandardMaterial attach='material' color={'black'}/>
    </mesh>
  )
}

const Point = ({position}) => {
  const mesh = useRef(null);

  var x = 2*(position.x/50)-1;
  var y = 2*(position.y/50)-1;
  // console.log(x);
  // console.log(y);
  return (
    <mesh position={[x, y, 0]} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[0.1,0.1,0]} />
      <meshStandardMaterial attach='material' color={'black'}/>
    </mesh>
  )
}

const numDrops = 100;
const drops = new Array(numDrops).fill();
const color = '#A2CCB6';

const Rain = () => {
  const material = useRef()
  const [color] = useState(() => parseInt(color))
  const [ratio] = useState(0.5)
  const [width] = useState(0.5)

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

// const Rain = () => {
//   const rain = useMemo(() => new THREE.TextureLoader().load(RaindropImg), [RaindropImg]);
//
//   return (
//     <mesh>
//       <planeBufferGeometry attach="geometry" args={[4, 4]}/>
//       <meshLambertMaterial attach="material" transparent>
//         <primitive attach="map" object={rain} />
//       </meshLambertMaterial>
//     </mesh>
//   )
// }

const Frame2 = () => {


  return (
    <div className="frame2">
      <Canvas
        className="frame__canvas2"
        colorManagement
        camera={{position: [0, 0, 10], fov: 20}}
      >
        <ambientLight intensity={0.4}/>
        {/*<Circle />
        <RandomShape />*/}
        <Shape />
      </Canvas>
    </div>
  );
}

export default Frame2;
