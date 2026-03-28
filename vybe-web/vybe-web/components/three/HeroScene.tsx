'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import ParticleField from './ParticleField';
import VinylRecord from './VinylRecord';
import AudioVisualizer from './AudioVisualizer';

interface Props { isPlaying?: boolean; }

export default function HeroScene({ isPlaying = false }: Props) {
  return (
    <Canvas shadows dpr={[1, 1.5]} style={{ background: 'transparent' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <Suspense fallback={null}>
        <ParticleField count={1800} />
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <VinylRecord isPlaying={isPlaying} />
        </Float>
        <group position={[0, -0.5, 0]}>
          <AudioVisualizer isPlaying={isPlaying} barCount={64} />
        </group>
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
