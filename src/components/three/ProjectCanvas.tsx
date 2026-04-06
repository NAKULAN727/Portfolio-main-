"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

function ProjectCube({ title, color }: { title: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += hovered ? delta * 2 : delta * 0.4;
    meshRef.current.rotation.x += delta * 0.1;
  });

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={[2.2, 2.2, 2.2]}
        radius={0.1}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial color={color} wireframe={hovered} />
      </RoundedBox>
      <Text position={[0, 0, 1.2]} fontSize={0.22} color="#fff" anchorX="center" anchorY="middle" maxWidth={1.8}>
        {title}
      </Text>
    </group>
  );
}

export default function ProjectCanvas({ title, color }: { title: string; color: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ antialias: false }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <ProjectCube title={title} color={color} />
    </Canvas>
  );
}
