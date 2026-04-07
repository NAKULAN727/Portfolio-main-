"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const NAME = "NAKULAN".split("");

function WavyRing({ index, total }: { index: number, total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Phase offset for wave motion
  const phase = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Complex rotation for weaving effect
    meshRef.current.rotation.z = time * 0.5 + phase;
    meshRef.current.rotation.x = Math.sin(time + phase) * 0.3;
    meshRef.current.rotation.y = Math.cos(time * 0.8 + phase) * 0.2;
    
    // Pulsing scale
    const s = 1 + Math.sin(time * 2 + phase) * 0.05;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.015, 16, 128]} />
      <meshStandardMaterial
        color="#0ea5e9"
        emissive="#0ea5e9"
        emissiveIntensity={4}
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </mesh>
  );
}

function SwirlObject() {
  const rings = Array.from({ length: 8 });
  return (
    <group>
      {rings.map((_, i) => (
        <WavyRing key={i} index={i} total={8} />
      ))}
      {/* Central energy glow */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function Particles() {
  const count = 40;
  const mesh = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#0ea5e9" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [shrinking, setShrinking] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setShrinking(true);
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
      }, 900);
    }, 3800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!shrinking && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            transition: { duration: 0.8, ease: "easeIn" }
          }}
        >
          {/* Ambient depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.04)_0%,_transparent_70%)]" />

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-4xl">
            {/* Swirl 3D Object Container */}
            <div className="w-full h-[350px] md:h-[450px] relative mt-[-40px]">
              <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={30} />
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 0, 0]} intensity={2} color="#0ea5e9" />
                
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <SwirlObject />
                </Float>
                <Particles />
              </Canvas>
              
              {/* Blur blend overlay */}
              <div className="absolute inset-0 m-auto w-48 h-48 bg-sky-500/10 blur-[90px] rounded-full pointer-events-none" />
            </div>

            {/* NAKULAN Text */}
            <div className="flex flex-col items-center mt-[-20px]">
              <div className="flex space-x-3 md:space-x-5 text-4xl md:text-7xl font-black tracking-[0.35em] text-white uppercase drop-shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                {NAME.map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      filter: "blur(0px)",
                    }}
                    transition={{
                      scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.08 + 1 },
                      opacity: { duration: 0.5, delay: i * 0.08 + 1 },
                      filter: { duration: 0.8, delay: i * 0.08 + 1 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Status bar */}
              <div className="mt-12 flex flex-col items-center">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "200px" }}
                    transition={{ delay: 1.8, duration: 2, ease: "easeInOut" }}
                    className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-40" 
                 />
                 <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="text-[10px] uppercase tracking-[0.8em] font-bold text-sky-400 mt-4 pl-3"
                  >
                    Optimizing Environment
                  </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
