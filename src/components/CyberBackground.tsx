import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const DigitalRain = () => {
  const count = 1000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const glyphs = useMemo(() => {
    return Array.from({ length: 20 }, () => 
      String.fromCharCode(0x30A0 + Math.random() * 96)
    );
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        Math.random() * 40 - 20,
        Math.random() * 20 - 10,
        Math.random() * 10 - 5
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      color.setHSL(0.3, 1, 0.1 + Math.random() * 0.5);
      meshRef.current.setColorAt(i, color);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, dummy.matrix);
      dummy.position.y -= 0.1;
      if (dummy.position.y < -10) {
        dummy.position.y = 10;
        dummy.position.x = Math.random() * 40 - 20;
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <planeGeometry args={[0.4, 0.8]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
};

const Hexagon = ({ position, size = 1 }: { position: [number, number, number], size?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.01;
    ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <circleGeometry args={[size, 6]} />
        <meshStandardMaterial 
          color="#00ff41" 
          emissive="#00ff41" 
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={size * 0.6}
        color="#00ff41"
        anchorX="center"
        anchorY="middle"
        outlineColor="#000"
        outlineWidth={0.01}
      >
        {Math.random() > 0.5 ? '🔒' : '🛡️'}
      </Text>
    </group>
  );
};

const BinaryStreams = () => {
  const groupRef = useRef<THREE.Group>(null);
  const binaryStrings = useMemo(() => {
    return Array.from({ length: 15 }, () => 
      Array.from({ length: 30 }, () => Math.round(Math.random())).join('')
    );
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.x = Math.sin(state.clock.getElapsedTime() * 0.3 + i) * 8;
      child.position.z = Math.cos(state.clock.getElapsedTime() * 0.3 + i) * 8;
      child.rotation.y = state.clock.getElapsedTime() * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {binaryStrings.map((binary, i) => (
        <Text
          key={i}
          position={[0, i * 0.5 - 4, 0]}
          fontSize={0.4}
          color="#00ff41"
          outlineColor="#000"
          outlineWidth={0.02}
        >
          {binary}
        </Text>
      ))}
    </group>
  );
};

export const CyberBackground = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ antialias: false }}
    >
      <color attach="background" args={['#111']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
      <DigitalRain />
      {Array.from({ length: 20 }).map((_, i) => (
        <Hexagon 
          key={i} 
          position={[
            Math.random() * 20 - 10, 
            Math.random() * 10 - 5, 
            Math.random() * 10 - 5
          ]} 
          size={0.3 + Math.random() * 0.7}
        />
      ))}
      <BinaryStreams />
      
      <EffectComposer>
        <Bloom 
          intensity={1.5} 
          kernelSize={5} 
          luminanceThreshold={0.15} 
          luminanceSmoothing={0.025} 
        />
      </EffectComposer>
    </Canvas>
  );
};
