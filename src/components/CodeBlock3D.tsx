
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls, useFont } from '@react-three/drei';
import * as THREE from 'three';

interface CodeTextProps {
  text: string;
}

const CodeText = ({ text }: CodeTextProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Animation für die 3D-Elemente
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  // Vereinfachter Code für die 3D-Ansicht
  const displayText = text
    .split('\n')
    .slice(0, 5)
    .join('\n')
    .substring(0, 150) + '...';

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-6, 2, 0]}
        scale={[0.5, 0.5, 0.5]}
      >
        {displayText}
        <meshStandardMaterial color="#43d9ad" />
      </Text3D>
    </mesh>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null!);
  const particleCount = 300;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Initialisiere Partikel mit zufälligen Positionen und Farben
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    
    colors[i3] = 0.2 + Math.random() * 0.5; // R
    colors[i3 + 1] = 0.8 + Math.random() * 0.2; // G (grünlicher)
    colors[i3 + 2] = 0.5 + Math.random() * 0.5; // B
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  );
};

interface CodeBlock3DProps {
  code: string;
  className?: string;
}

const CodeBlock3D: React.FC<CodeBlock3DProps> = ({ code, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-load the font
  useEffect(() => {
    // We don't need to manually load the font with FontLoader
    // It's loaded automatically by Text3D component
  }, []);

  return (
    <div className={`code-block-3d ${className || ''} relative h-64 md:h-96 w-full`} ref={containerRef}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 75 }} 
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <CodeText text={code} />
        <FloatingParticles />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
};

export default CodeBlock3D;
