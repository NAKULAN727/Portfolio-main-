"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

const nodes = [
  { label: "LinkedIn", url: "https://linkedin.com/in/your-profile", position: [1.1, 0.4, 0.6] as [number, number, number], color: "#0a66c2" },
  { label: "GitHub", url: "https://github.com/your-username", position: [-0.8, 0.8, 0.7] as [number, number, number], color: "#e2e8f0" },
  { label: "Email", url: "mailto:your@email.com", position: [0.2, -1.1, 0.5] as [number, number, number], color: "#f59e0b" },
];

function GlobeNode({ label, url, position, color }: (typeof nodes)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <group position={position}>
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => window.open(url, "_blank")}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1.5 : 0.4} />
      </mesh>
      {hovered && (
        <Html center distanceFactor={4}>
          <div className="px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap pointer-events-none">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1, 48, 48]}>
        <meshStandardMaterial color="#6366f1" wireframe opacity={0.25} transparent />
      </Sphere>
      {nodes.map((n) => <GlobeNode key={n.label} {...n} />)}
    </group>
  );
}

export default function GlobeCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} gl={{ antialias: false }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1} />
      <Globe />
    </Canvas>
  );
}
