"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Sky, Environment, Cloud, Clouds, Stars } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from 'three';
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import Car from "./Car";
import Road from "./Road";
import HUD from "./HUD";
import { useGameStore } from "./GameState";

function World() {
    const isNight = useGameStore((state) => state.isNight);

    return (
        <>
            {/* Atmosphere */}
            {isNight ? (
                <>
                    <color attach="background" args={['#010103']} />
                    <Sky
                        sunPosition={[-10, -5, -10]}
                        turbidity={10}
                        rayleigh={2}
                        mieCoefficient={0.1}
                        mieDirectionalG={0.9}
                    />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <fog attach="fog" args={['#010103', 50, 300]} />
                    <ambientLight intensity={0.1} />
                    <directionalLight position={[10, 10, 5]} intensity={0.5} />
                    <Environment preset="night" />
                </>
            ) : (
                <>
                    <color attach="background" args={['#87CEEB']} />
                    <Sky
                        sunPosition={[100, 20, 100]}
                        turbidity={0.1}
                        rayleigh={2}
                        mieCoefficient={0.005}
                        mieDirectionalG={0.8}
                    />
                    <fog attach="fog" args={['#87CEEB', 50, 250]} />
                    <Clouds material={THREE.MeshBasicMaterial}>
                        <Cloud seed={10} bounds={[50, 2, 50]} volume={5} color="#f0f0f0" position={[0, -20, -100]} />
                        <Cloud seed={11} bounds={[50, 2, 50]} volume={5} color="#ffffff" position={[100, -15, -200]} />
                    </Clouds>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[50, 50, 25]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
                    <Environment preset="city" />
                </>
            )}

            {/* Post Processing - Slightly optimized Bloom */}
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={1.2} intensity={0.5} levels={7} mipmapBlur={false} />
                <ToneMapping />
            </EffectComposer>

            {/* Physics World - Bruno Simon-style fixed timestep physics */}
            <Physics
                gravity={[0, -9.8, 0]}
                iterations={10}
                tolerance={0.001}
                step={1 / 60}
                maxSubSteps={5}
                broadphase="SAP"
                allowSleep={true}
                defaultContactMaterial={{
                    friction: 0.3,
                    restitution: 0.3,
                    contactEquationStiffness: 1e8,
                    contactEquationRelaxation: 3,
                    frictionEquationStiffness: 1e8,
                    frictionEquationRelaxation: 3,
                }}
            >
                <Car />
                <Road />
            </Physics>
        </>
    );
}

export default function Scene() {
    return (
        <div className="w-full h-full relative overflow-hidden bg-black">
            <HUD />
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
                <Suspense fallback={null}>
                    <World />
                </Suspense>
            </Canvas>
        </div>
    );
}
