'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props { isPlaying?: boolean; barCount?: number; }

export default function AudioVisualizer({ isPlaying = false, barCount = 64 }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef  = useRef<THREE.Mesh[]>([]);

  const barMeshes = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      const angle = (i / barCount) * Math.PI * 2;
      const radius = 2.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return { x, z, angle };
    });
  }, [barCount]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;

    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const phase = (i / barCount) * Math.PI * 2;
      const wave1 = Math.sin(t * 2 + phase) * 0.5 + 0.5;
      const wave2 = Math.sin(t * 3.7 + phase * 2) * 0.3 + 0.3;
      const wave3 = Math.cos(t * 1.5 + phase * 1.5) * 0.2 + 0.2;
      const height = isPlaying
        ? (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2) * 2.5 + 0.1
        : 0.08 + Math.sin(t * 0.5 + phase) * 0.04;
      bar.scale.y = height;
      bar.position.y = height / 2;
      const intensity = isPlaying ? wave1 : 0.3;
      (bar.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    });
  });

  return (
    <group ref={groupRef}>
      {barMeshes.map((b, i) => (
        <mesh
          key={i}
          ref={el => { if (el) barsRef.current[i] = el; }}
          position={[b.x, 0, b.z]}
          rotation={[0, -b.angle + Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.08, 1, 0.08]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#7C3AED' : i % 3 === 1 ? '#00D9FF' : '#FF2D87'}
            emissive={i % 3 === 0 ? '#7C3AED' : i % 3 === 1 ? '#00D9FF' : '#FF2D87'}
            emissiveIntensity={0.5}
            roughness={0.2} metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
