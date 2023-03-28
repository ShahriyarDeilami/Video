import React, { useState } from 'react';
import * as THREE from 'three';

const TV = () => {
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = '/flowAbstract3.mp4';
    vid.crossOrigin = 'Anonymous';
    vid.loop = true;
    vid.muted = true;
    vid.autoplay = true;
    vid.play();

    return vid;
  });

  return (
    <group
      rotation={[Math.PI / 8, Math.PI * 1.2, 0]}
      onClick={() => (video.paused ? video.play() : video.pause())}
    >
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]} castShadow>
        <boxGeometry attach='geometry' args={[1, 1, 1]} />
        <meshStandardMaterial emissive={'white'}>
          <videoTexture
            minFilter={THREE.LinearFilter}
            magFilter={THREE.LinearFilter}
            attach='map'
            args={[video]}
          />
          <videoTexture
            attach='emissiveMap'
            args={[video]}
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
          />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};

export default TV;
