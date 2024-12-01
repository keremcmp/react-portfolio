// src/components/Scene3D.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const Scene3D = () => {
  return (
    <div style={{ height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5] }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[2, 1, 1]} />
          <Sphere args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
              color="#3d1c56"
              attach="material"
              distort={0.5}
              speed={1.5}
              roughness={0}
            />
          </Sphere>
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </Suspense>
    </div>
  );
};

const FallbackScene = () => (
  <div style={{ 
    height: '100vh', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    zIndex: 1,
    background: 'linear-gradient(45deg, #3d1c56 0%, #1a0b2e 100%)'
  }} />
);

export default function Scene3DWrapper() {
  try {
    return <Scene3D />;
  } catch (error) {
    console.error('WebGL not supported:', error);
    return <FallbackScene />;
  }
}