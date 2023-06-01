import {Suspense, useEffect, useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Preload, useGLTF} from '@react-three/drei';
import CanvasLoader from '../Loader';


const Computers = ({isMobile}) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.15} 
      groundColor="black"/>
      <pointLight intensity={1}/>
      <primitive 
        object={computer.scene}
        scale={ isMobile? 0.6: 0.75}
        position={ isMobile? [0, -4, -1.2]:[0, -4.25,-1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
        />
    </mesh>
  )
}

const ComputersCanvas = () => {
  //code to chnage to isMobile or no
  const [isMobile, setIsMobile] = useState(false); //initially false
  useEffect(()=> {
    //add event listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    //get the initial value of the isMobile var
    setIsMobile(mediaQuery.matches); //bool, does it match or no?
    //define a callback funtion to handle changes to the mediaQuery
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    // Add the callback funtion as an eventlistener for changes to the mediaQuery
    //we need to add an eventlistener and remove it because this is inside useEffect
    mediaQuery.addEventListener('change', 
    handleMediaQueryChange);
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change',
        handleMediaQueryChange);
    };
  }, []);
  return (
    <Canvas
        frameloop="demand"
        shadows
        camera={{position: [20, 3, 5], fov: 25}} 
        gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI/2}
          minPolarAngle={Math.PI/2}
        /> 
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all/>
    </Canvas>
  );
};
export default ComputersCanvas