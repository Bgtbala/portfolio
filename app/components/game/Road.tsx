import { useBox } from "@react-three/cannon";
import { Text, Float } from "@react-three/drei";
import { useMemo, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "./GameState";

type FeatureType = 'none' | 'start' | 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'contact' | 'skills_projects';
type SegmentType = 'straight' | 'left' | 'right' | 'intersection' | '3-way-left-right';

interface RoadSegmentProps {
    position: [number, number, number];
    rotation: [number, number, number];
    type: SegmentType;
    feature?: FeatureType;
    length: number;
    description?: string;
    isDeadEnd?: boolean;
}

const ROAD_WIDTH = 20;

// Information Terminal / Building Component
const Building = ({ label, description, color, position, rotation, width = 16 }: any) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Structural Core */}
            <mesh position={[0, 3, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, 10, 10]} />
                <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Top Logo / Artifact */}
            <Float speed={2} rotationIntensity={0.5}>
                <mesh position={[0, 12, 0]}>
                    <octahedronGeometry args={[2, 0]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
                </mesh>
            </Float>

            {/* Front Glass Display Panel */}
            <group position={[0, 4, 5.2]}>
                {/* Main Glass Panel */}
                <mesh>
                    <planeGeometry args={[width + 8, 12]} />
                    <meshStandardMaterial color="#050505" transparent opacity={0.8} roughness={0.1} metalness={0.5} />
                </mesh>

                {/* Glowing Side Bars */}
                <mesh position={[-(width + 8) / 2, 0, 0.1]}>
                    <boxGeometry args={[0.1, 12, 0.1]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </mesh>
                <mesh position={[(width + 8) / 2, 0, 0.1]}>
                    <boxGeometry args={[0.1, 12, 0.1]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </mesh>

                {/* Header Section */}
                <mesh position={[0, 5, 0.1]}>
                    <planeGeometry args={[width + 8, 1.5]} />
                    <meshStandardMaterial color={color} transparent opacity={0.2} />
                </mesh>
                <Text position={[0, 5, 0.2]} fontSize={1.2} color="white" anchorX="center" anchorY="middle">
                    {label}
                </Text>

                {/* Content Area */}
                {description && (
                    <Text
                        position={[0, -1, 0.2]}
                        fontSize={0.8}
                        color="#ffffff"
                        maxWidth={width + 6}
                        textAlign="center"
                        lineHeight={1.4}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {description}
                    </Text>
                )}

                {/* Footer Bar */}
                <mesh position={[0, -5.5, 0.1]}>
                    <planeGeometry args={[width + 4, 0.1]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
                </mesh>
            </group>
        </group>
    );
};


const Wall = ({ position, rotation, side, length }: { position: any, rotation: any, side: 'left' | 'right', length: number }) => {
    const offset = side === 'left' ? -(ROAD_WIDTH / 2 + 1) : (ROAD_WIDTH / 2 + 1);
    const euler = new THREE.Euler(...rotation);
    const offsetVec = new THREE.Vector3(offset, 1, 0).applyEuler(euler);
    const wallPos: [number, number, number] = [position[0] + offsetVec.x, position[1] + offsetVec.y, position[2] + offsetVec.z];

    useBox(() => ({ type: 'Static', position: wallPos, rotation: rotation, args: [1, 2, length] }));
    return null;
};

const NitroPickup = ({ position }: { position: [number, number, number] }) => {
    const { carPosition, setNitro, nitroActive } = useGameStore();
    useFrame(() => {
        if (nitroActive) return;
        const dist = new THREE.Vector3(...position).distanceTo(new THREE.Vector3(...carPosition));
        if (dist < 5) {
            setNitro(true);
            setTimeout(() => setNitro(false), 3000);
        }
    });
    return (
        <group position={position}>
            <Float speed={4} rotationIntensity={2}>
                <mesh><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={5} /></mesh>
            </Float>
            <pointLight color="#00ffcc" intensity={5} distance={10} />
        </group>
    );
};

const RoadSegment = ({ position, rotation, type, feature, length, description, isDeadEnd }: RoadSegmentProps) => {
    useBox(() => ({ type: 'Static', position, rotation, args: [ROAD_WIDTH, 0.5, length] }));
    const isLeftFeature = ['projects', 'education'].includes(feature || '') || feature === 'skills_projects';
    const isRightFeature = ['about', 'skills', 'experience', 'contact'].includes(feature || '') || feature === 'skills_projects';

    return (
        <group>
            <mesh position={position} rotation={rotation} receiveShadow>
                <boxGeometry args={[ROAD_WIDTH, 0.5, length]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
            </mesh>
            <group position={position} rotation={rotation}>
                {type === 'straight' && Array.from({ length: Math.floor(length / 10) }).map((_, i) => (
                    <mesh key={i} position={[0, 0.26, -length / 2 + (i + 0.5) * 10]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.5, 2]} /><meshStandardMaterial color="white" /></mesh>
                ))}
                {feature === 'about' && (
                    <Building
                        label="ABOUT ME"
                        description={`FULL STACK DEVELOPER\n\nSpecializing in building robust\nscalable MERN applications.\nFocusing on performance optimization\nand exceptional UX design.`}
                        color="#ff9900"
                        position={[ROAD_WIDTH / 2 + 12, 0, 0]}
                        rotation={[0, -Math.PI / 2, 0]}
                    />
                )}
                {feature === 'education' && (
                    <Building
                        label="EDUCATION"
                        description={`ACADEMIC FOUNDATION\n\nBachelor of Engineering (ECE)\nSaranathan College of Engineering\nCGPA: 8.13 | 2019 - 2023\nTechnical Merit Scholarship Recipient`}
                        color="#8b5cf6"
                        position={[-(ROAD_WIDTH / 2 + 12), 0, 0]}
                        rotation={[0, Math.PI / 2, 0]}
                    />
                )}
                {feature === 'contact' && (
                    <Building
                        label="CONTACT"
                        description={`CONNECT PROTOCOL\n\nEmail: balagangatharan17@gmail.com\nLinkedIn: /in/balagangatharan17\nGitHub: /Bgtbala\nLocation: Tamil Nadu, India`}
                        color="#f59e0b"
                        position={[0, 0, -(ROAD_WIDTH / 2 + 12)]}
                        rotation={[0, 0, 0]}
                        width={22}
                    />
                )}
                {feature === 'skills_projects' && (
                    <group>
                        <Building
                            label="TECHNICAL STACK"
                            description={`CORE: React • Next.js • TypeScript\nBACKEND: Node.js • Express • MongoDB\nCLOUD: AWS (EC2/S3) • Docker • CI/CD`}
                            color="#10b981"
                            position={[ROAD_WIDTH / 2 + 12, 0, 0]}
                            rotation={[0, -Math.PI / 2, 0]}
                        />
                        <Building
                            label="NOTABLE PROJECTS"
                            description={`FILMOX: Content & Entertainment\nVAIDYOG: Healthcare Job Portal\nSAMURAI: Custom ERP System\nGOG: Event & Initiative Management`}
                            color="#ef4444"
                            position={[-(ROAD_WIDTH / 2 + 12), 0, 0]}
                            rotation={[0, Math.PI / 2, 0]}
                        />
                    </group>
                )}
                {feature === 'experience' && (
                    <Building
                        label="EXPERIENCE"
                        description={`CAREER TIMELINE\n\nSoftware Engineer (MERN)\nKods Technology Pvt. Ltd.\nJuly 2024 — Present\nBuilding Scalable SaaS Platforms`}
                        color="#3b82f6"
                        position={[0, 0, -(ROAD_WIDTH / 2 + 12)]}
                        rotation={[0, 0, 0]}
                    />
                )}
            </group>
            {type === 'straight' && (
                <>
                    {!isLeftFeature && <Wall position={position} rotation={rotation} side="left" length={length} />}
                    {!isRightFeature && <Wall position={position} rotation={rotation} side="right" length={length} />}
                </>
            )}
        </group>
    );
};

const DriftArena = ({ position }: { position: [number, number, number] }) => {
    const size = 300;
    const gapWidth = 40;
    const sideWallWidth = (size - gapWidth) / 2;
    useBox(() => ({ type: 'Static', position: [position[0], position[1] - 0.25, position[2]], args: [size, 0.5, size] }));
    useBox(() => ({ type: 'Static', position: [position[0], 7.5, position[2] - size / 2], args: [size, 15, 4] }));
    return (
        <group position={position}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[size, size]} /><meshStandardMaterial color="#a67c52" roughness={0.8} /></mesh>
            <mesh position={[0, 20, size / 2]}><boxGeometry args={[gapWidth + 10, 8, 1]} /><meshStandardMaterial color="#000" /></mesh>
            <Text position={[0, 20, size / 2 + 0.6]} fontSize={4} color="#00ff88">FREE ROAM ARENA</Text>
            {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => (
                <group key={i} position={[x * (size / 2 - 10), 0, z * (size / 2 - 10)]}>
                    <mesh position={[0, 25, 0]}><boxGeometry args={[2, 50, 2]} /><meshStandardMaterial color="#111" /></mesh>
                    <mesh position={[0, 50, 0]}><boxGeometry args={[10, 6, 2]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={10} /></mesh>
                </group>
            ))}
        </group>
    );
};

export default function Road() {
    const { setCurrentSection, carPosition } = useGameStore();
    const lastSection = useRef("");

    // Landmark tracking - OPTIMIZED: Only update on change
    useFrame(() => {
        const z = carPosition[2];
        const x = carPosition[0];

        let section = "Sky Road";
        if (z > 10) section = "Starting Point";
        else if (z > -10 && z <= 10) section = "Profile Center";
        else if (z > -50 && z <= -10) section = "Academic Wing";
        else if (z <= -160) section = "Drift Stadium";
        else if (x > 15) section = "Contact Zone";
        else if (x < -15) section = "Skills & Projects";

        if (section !== lastSection.current) {
            setCurrentSection(section);
            lastSection.current = section;
        }
    });
    const roadSegments = useMemo(() => {
        const segments: RoadSegmentProps[] = [];
        segments.push({ position: [0, -0.1, 20], rotation: [0, 0, 0], type: 'straight', feature: 'start', length: 20 });
        segments.push({
            position: [0, -0.1, 0],
            rotation: [0, 0, 0],
            type: 'straight',
            feature: 'about',
            length: 20,
            description: "FULL STACK DEVELOPER\n\nSpecializing in building robust\nscalable MERN applications.\nFocusing on performance optimization\nand exceptional UX design."
        });
        segments.push({ position: [0, -0.1, -20], rotation: [0, 0, 0], type: 'straight', feature: 'none', length: 20 });
        segments.push({
            position: [0, -0.1, -40],
            rotation: [0, 0, 0],
            type: 'straight',
            feature: 'education',
            length: 20,
            description: "ACADEMIC FOUNDATION\n\nBachelor of Engineering (ECE)\nSaranathan College of Engineering\nCGPA: 8.13 | 2019 - 2023\nTechnical Merit Scholarship Recipient"
        });
        segments.push({ position: [0, -0.1, -60], rotation: [0, 0, 0], type: 'intersection', feature: 'none', length: 20 });
        segments.push({
            position: [20, -0.1, -60],
            rotation: [0, -Math.PI / 2, 0],
            type: 'straight',
            feature: 'contact',
            length: 20,
            isDeadEnd: true,
            description: `CONNECT PROTOCOL\n\nEmail: balagangatharan17@gmail.com\nLinkedIn: /in/balagangatharan17\nGitHub: /Bgtbala\nLocation: Tamil Nadu, India`
        });
        segments.push({ position: [-20, -0.1, -60], rotation: [0, Math.PI / 2, 0], type: 'straight', feature: 'none', length: 20 });
        segments.push({ position: [-40, -0.1, -60], rotation: [0, Math.PI / 2, 0], type: 'straight', feature: 'skills_projects', length: 20 });
        segments.push({
            position: [-60, -0.1, -60],
            rotation: [0, Math.PI / 2, 0],
            type: 'straight',
            feature: 'experience',
            length: 20,
            isDeadEnd: true,
            description: "CAREER TIMELINE\n\nSoftware Engineer (MERN)\nKods Technology Pvt. Ltd.\nJuly 2024 — Present\nBuilding Scalable SaaS Platforms"
        });
        for (let i = 1; i <= 7; i++) segments.push({ position: [0, -0.1, -60 - (i * 20)], rotation: [0, 0, 0], type: 'straight', feature: 'none', length: 20 });
        return segments;
    }, []);

    return (
        <group>
            {roadSegments.map((seg, i) => (<RoadSegment key={i} {...seg} position={seg.position as any} rotation={seg.rotation as any} />))}
            <NitroPickup position={[0, 1, 10]} /><NitroPickup position={[0, 1, -120]} /><NitroPickup position={[0, 1, -200]} />
            <DriftArena position={[0, -0.1, -340]} />
        </group>
    );
}
