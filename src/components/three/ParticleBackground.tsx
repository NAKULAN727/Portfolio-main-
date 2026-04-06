"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1200 }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions] = [
    new Float32Array(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 20)
    ),
  ];

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.04;
      mesh.current.rotation.x = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#6366f1" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <Canvas
      className="absolute inset-0 -z-10"
      camera={{ position: [0, 0, 6], fov: 75 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Particles />
    </Canvas>
  );
}
