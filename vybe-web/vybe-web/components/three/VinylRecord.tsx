'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface Props { isPlaying?: boolean; imageUrl?: string; }

export default function VinylRecord({ isPlaying = false }: Props) {
  const groupRef  = useRef<THREE.Group>(null);
  const vinylRef  = useRef<THREE.Mesh>(null);
  const glowRef   = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;

    // Floating animation
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.3;
    groupRef.current.rotation.y = t * (isPlaying ? 1.8 : 0.4);

    // Subtle tilt
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.06;
    groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.04;

    // Glow pulse
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 2) * (isPlaying ? 0.08 : 0.03);
      glowRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} scale={[1.7, 1.7, 1.7]}>
      {/* Outer glow ring */}
      <mesh ref={glowRef}>
        <torusGeometry args={[1.22, 0.08, 12, 100]} />
        <meshBasicMaterial color={isPlaying ? '#00D9FF' : '#7C3AED'} transparent opacity={0.5} />
      </mesh>

      {/* Vinyl disc */}
      <mesh ref={vinylRef}>
        <cylinderGeometry args={[1.2, 1.2, 0.05, 128]} />
        <meshStandardMaterial color="#111118" roughness={0.1} metalness={0.9}
          envMapIntensity={1.5} />
      </mesh>

      {/* Groove rings */}
      {[0.4, 0.55, 0.7, 0.85, 1.0, 1.12].map((r, i) => (
        <mesh key={i} position={[0, 0.028, 0]}>
          <torusGeometry args={[r, 0.003, 6, 128]} />
          <meshStandardMaterial color={isPlaying ? '#00D9FF' : '#7C3AED'}
            emissive={isPlaying ? '#00D9FF' : '#7C3AED'}
            emissiveIntensity={isPlaying ? 0.4 : 0.15} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Center label */}
      <mesh position={[0, 0.031, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.01, 64]} />
        <meshStandardMaterial color={isPlaying ? '#1a0a30' : '#0f0f1e'}
          emissive={isPlaying ? '#7C3AED' : '#3b0d6b'} emissiveIntensity={0.8} />
      </mesh>

      {/* Center hole */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Point lights */}
      <pointLight position={[0, 2, 0]} color={isPlaying ? '#00D9FF' : '#7C3AED'}
        intensity={isPlaying ? 3 : 1.2} distance={6} />
      <pointLight position={[2, 0, 2]} color="#FF2D87" intensity={0.8} distance={5} />
    </group>
  );
}
