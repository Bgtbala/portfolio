"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Sky, Environment, Cloud, Clouds } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from 'three';
import Car from "./Car";
import Road from "./Road";

export default function Scene() {
    return (
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }} style={{ background: '#87CEEB' }}>
            <Suspense fallback={null}>
                {/* Atmosphere */}
                <Sky
                    sunPosition={[100, 20, 100]}
                    turbidity={0.1}
                    rayleigh={2}
                    mieCoefficient={0.005}
                    mieDirectionalG={0.8}
                />
                <fog attach="fog" args={['#87CEEB', 50, 250]} />

                <Clouds material={THREE.MeshBasicMaterial}>
                    <Cloud seed={10} bounds={[50, 2, 50]} volume={10} color="#f0f0f0" position={[0, -20, -50]} />
                    <Cloud seed={11} bounds={[50, 2, 50]} volume={10} color="#ffffff" position={[100, -15, -100]} />
                    <Cloud seed={12} bounds={[50, 2, 50]} volume={10} color="#e0e0e0" position={[-100, -25, -150]} />
                    <Cloud seed={13} bounds={[50, 2, 50]} volume={10} color="#ffffff" position={[50, -10, 50]} />
                </Clouds>

                <ambientLight intensity={0.8} />
                <directionalLight
                    position={[50, 50, 25]}
                    intensity={2}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />
                <Environment preset="city" />

                {/* Physics World */}
                <Physics gravity={[0, -9.8, 0]} frictionGravity={null}>
                    <Car />
                    <Road />
                </Physics>
            </Suspense>
        </Canvas>
    );
}
