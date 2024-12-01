// src/components/Robot3D.js
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function RobotModel({ mousePosition }) {
  const { scene } = useGLTF('/robot.glb'); // You'll need to add a robot 3D model
  const robotRef = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    if (robotRef.current && mousePosition.current) {
      // Convert mouse position to 3D space
      const x = (mousePosition.current.x / window.innerWidth) * 2 - 1;
      const y = -(mousePosition.current.y / window.innerHeight) * 2 + 1;

      // Smooth movement
      robotRef.current.position.x = THREE.MathUtils.lerp(
        robotRef.current.position.x,
        x * (viewport.width / 2),
        0.1
      );
      robotRef.current.position.y = THREE.MathUtils.lerp(
        robotRef.current.position.y,
        y * (viewport.height / 2),
        0.1
      );

      // Make robot look at cursor
      robotRef.current.lookAt(new THREE.Vector3(x * 5, y * 5, 0));
    }
  });

  useEffect(() => {
    if (scene) {
      scene.scale.set(0.5, 0.5, 0.5);
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return <primitive ref={robotRef} object={scene} position={[2, 0, 0]} />;
}

export default function Robot3D() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1} />
        <RobotModel mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}