"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Sky, Environment, Stars } from "@react-three/drei";
import { Suspense } from "react";
import Car from "./Car";
import Road from "./Road";
import SignBoard from "./SignBoard";

export default function Scene() {
    return (
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
            <Suspense fallback={null}>
                {/* Atmosphere */}
                <Sky sunPosition={[100, 10, 100]} turbidity={0.1} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />
                <Environment preset="night" />

                {/* Physics World */}
                <Physics gravity={[0, -9.8, 0]} frictionGravity={null}>
                    <Car />
                    <Road />

                    {/* Sign Boards */}
                    {/* About Section */}
                    <SignBoard
                        position={[-15, 0, -20]}
                        rotation={[0, 0.5, 0]}
                        title="ABOUT ME"
                        description="Full Stack Developer with a passion for building scalable web apps."
                        color="#3b82f6"
                    />

                    {/* Skills Section */}
                    <SignBoard
                        position={[15, 0, -60]}
                        rotation={[0, -0.5, 0]}
                        title="SKILLS"
                        description="React, Next.js, Node.js, AWS, MongoDB, TypeScript"
                        color="#a855f7"
                    />

                    {/* Projects Section */}
                    <SignBoard
                        position={[-15, 0, -100]}
                        rotation={[0, 0.5, 0]}
                        title="PROJECTS"
                        description="Drive closer to see my latest work and case studies."
                        color="#f43f5e"
                    />

                    {/* Contact Section */}
                    <SignBoard
                        position={[0, 0, -140]}
                        rotation={[0, 0, 0]}
                        title="CONTACT"
                        description="balagangatharan17@gmail.com"
                        color="#10b981"
                    />

                </Physics>
            </Suspense>
        </Canvas>
    );
}
