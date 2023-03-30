import React, { Suspense } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import TV from '@/components/TV';
import Floor from '@/components/Floor';

extend({ BloomPass });

const Scene = () => {
  return (
    <Canvas
      camera={{ fov: 50, position: [1, 2, -3] }}
      style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}
      shadows
    >
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <fog attach='fog' args={['black', 1, 10]} />
      <directionalLight
        intensity={0.07}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <pointLight intensity={1} color='#117df0' />

      <Suspense fallback={null}>
        <TV />
        <Floor />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
