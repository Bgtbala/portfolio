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

// Bruno Simon-Inspired Building Component with Environmental Details
const Building = ({ label, description, color, position, rotation, width = 16 }: any) => {
    const meshRef = useRef<THREE.Group>(null);

    // Subtle breathing animation for holographic elements
    useFrame((state) => {
        if (meshRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 + 1;
            meshRef.current.children.forEach((child) => {
                if (child.userData.isHologram && child instanceof THREE.Mesh) {
                    const opacity = 0.3 + pulse * 0.1;
                    const { material } = child;
                    if (Array.isArray(material)) {
                        material.forEach((m) => { m.opacity = opacity; });
                    } else {
                        material.opacity = opacity;
                    }
                }
            });
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Base Foundation - Concrete */}
            <mesh position={[0, 0.5, 0]} receiveShadow>
                <boxGeometry args={[width + 4, 1, 12]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
            </mesh>

            {/* Main Building Structure - Layered Architecture */}
            <group>
                {/* Core Structure */}
                <mesh position={[0, 6, 0]} castShadow receiveShadow>
                    <boxGeometry args={[width, 10, 10]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
                </mesh>

                {/* Glass Facade Layers - Depth */}
                <mesh position={[0, 6, 5.1]} castShadow>
                    <boxGeometry args={[width - 2, 9, 0.2]} />
                    <meshPhysicalMaterial
                        color="#0a0a0a"
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.4}
                        transmission={0.6}
                    />
                </mesh>

                {/* Window Grid Pattern */}
                {Array.from({ length: 3 }).map((_, row) =>
                    Array.from({ length: Math.floor(width / 4) }).map((_, col) => (
                        <mesh
                            key={`${row}-${col}`}
                            position={[
                                -width / 2 + 2 + col * 4,
                                3 + row * 3,
                                5.2
                            ]}
                        >
                            <planeGeometry args={[1.5, 2]} />
                            <meshStandardMaterial
                                color="#1a3a4a"
                                emissive="#0a2a3a"
                                emissiveIntensity={0.5}
                                transparent
                                opacity={0.6}
                            />
                        </mesh>
                    ))
                )}

                {/* Accent Structural Beams */}
                <mesh position={[-width / 2, 6, 5.15]} castShadow>
                    <boxGeometry args={[0.3, 10, 0.3]} />
                    <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[width / 2, 6, 5.15]} castShadow>
                    <boxGeometry args={[0.3, 10, 0.3]} />
                    <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>

            {/* Rooftop Elements - Bruno Simon-style */}
            <group position={[0, 11.5, 0]}>
                {/* Rooftop Platform */}
                <mesh castShadow>
                    <boxGeometry args={[width + 2, 0.3, 11]} />
                    <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
                </mesh>

                {/* Animated Logo/Symbol - Floating */}
                <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                    <mesh position={[0, 2, 0]} ref={meshRef}>
                        <octahedronGeometry args={[1.5, 1]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={3}
                            metalness={0.9}
                            roughness={0.1}
                        />
                    </mesh>
                </Float>

                {/* Support Beams for Logo */}
                {[-1, 1].map((side) => (
                    <mesh key={side} position={[side * 2, 0.5, 0]} castShadow>
                        <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
                        <meshStandardMaterial color="#444" metalness={0.8} />
                    </mesh>
                ))}

                {/* Rooftop Lighting */}
                <pointLight position={[0, 3, 0]} color={color} intensity={10} distance={20} />
            </group>

            {/* Holographic Display Screen */}
            <group position={[0, 6, 5.5]} ref={meshRef}>
                {/* Screen Frame */}
                <mesh position={[0, 0, -0.1]}>
                    <planeGeometry args={[width + 2, 8]} />
                    <meshStandardMaterial color="#000" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Glowing Border */}
                {[
                    { pos: [0, 4, 0], args: [width + 2.5, 0.1] },
                    { pos: [0, -4, 0], args: [width + 2.5, 0.1] },
                    { pos: [-(width + 2) / 2, 0, 0], args: [0.1, 8] },
                    { pos: [(width + 2) / 2, 0, 0], args: [0.1, 8] },
                ].map((border, i) => (
                    <mesh key={i} position={border.pos as any}>
                        <planeGeometry args={border.args as any} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={2.5}
                        />
                    </mesh>
                ))}

                {/* Header Bar */}
                <mesh position={[0, 3.2, 0.05]}>
                    <planeGeometry args={[width + 1, 1]} />
                    <meshStandardMaterial
                        color={color}
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {/* Title Text */}
                <Text
                    position={[0, 3.2, 0.1]}
                    fontSize={0.8}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight={700}
                >
                    {label}
                </Text>

                {/* Content Text */}
                {description && (
                    <Text
                        position={[0, 0, 0.1]}
                        fontSize={0.6}
                        color="#e0e0e0"
                        maxWidth={width}
                        textAlign="center"
                        lineHeight={1.5}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {description}
                    </Text>
                )}

                {/* Scanline Effect - Hologram feel */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <mesh
                        key={i}
                        position={[0, -3.5 + i * 0.8, 0.06]}
                        userData={{ isHologram: true }}
                    >
                        <planeGeometry args={[width + 1, 0.05]} />
                        <meshStandardMaterial
                            color={color}
                            transparent
                            opacity={0.1}
                        />
                    </mesh>
                ))}

                {/* Screen Glow */}
                <pointLight position={[0, 0, 1]} color={color} intensity={5} distance={15} />
            </group>

            {/* Environmental Details - Street Elements */}
            <group>
                {/* Street Lamp Posts */}
                {[-1, 1].map((side) => (
                    <group key={side} position={[side * (width / 2 + 6), 0, 8]}>
                        {/* Pole */}
                        <mesh position={[0, 3, 0]} castShadow>
                            <cylinderGeometry args={[0.15, 0.2, 6, 8]} />
                            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
                        </mesh>

                        {/* Lamp Head */}
                        <mesh position={[0, 6.5, 0]} castShadow>
                            <cylinderGeometry args={[0.5, 0.3, 0.8, 8]} />
                            <meshStandardMaterial
                                color="#ffeb3b"
                                emissive="#ffeb3b"
                                emissiveIntensity={2}
                            />
                        </mesh>

                        {/* Light Source */}
                        <pointLight
                            position={[0, 6, 0]}
                            color="#ffeb3b"
                            intensity={15}
                            distance={25}
                            castShadow
                        />
                    </group>
                ))}

                {/* Decorative Planters */}
                {[-1, 1].map((side) => (
                    <group key={`planter-${side}`} position={[side * (width / 2 + 4), 0.5, 6]}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.8, 0.6, 1, 8]} />
                            <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
                        </mesh>
                        {/* Simple "tree" - sphere on stick */}
                        <mesh position={[0, 2, 0]}>
                            <sphereGeometry args={[0.8, 8, 8]} />
                            <meshStandardMaterial color="#2d5016" roughness={0.8} />
                        </mesh>
                        <mesh position={[0, 1, 0]}>
                            <cylinderGeometry args={[0.1, 0.15, 1.5, 6]} />
                            <meshStandardMaterial color="#3d2817" roughness={0.9} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Particle-like dots floating around (simplified) */}
            {Array.from({ length: 6 }).map((_, i) => (
                <Float
                    key={i}
                    speed={2 + i * 0.5}
                    rotationIntensity={0}
                    floatIntensity={2}
                >
                    <mesh
                        position={[
                            (Math.random() - 0.5) * width,
                            8 + Math.random() * 4,
                            4 + Math.random() * 2
                        ]}
                    >
                        <sphereGeometry args={[0.1, 8, 8]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={4}
                        />
                    </mesh>
                </Float>
            ))}
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
    useBox(() => ({
        type: 'Static',
        position,
        rotation,
        args: [ROAD_WIDTH, 0.5, length],
        material: {
            friction: 0.4, // Higher friction for better grip
            restitution: 0.0, // No bounce on road
        }
    }));
    const isLeftFeature = ['projects', 'education'].includes(feature || '') || feature === 'skills_projects';
    const isRightFeature = ['about', 'skills', 'experience', 'contact'].includes(feature || '') || feature === 'skills_projects';

    return (
        <group>
            {/* Main Road Surface */}
            <mesh position={position} rotation={rotation} receiveShadow>
                <boxGeometry args={[ROAD_WIDTH, 0.5, length]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            {/* Road Details Group */}
            <group position={position} rotation={rotation}>
                {/* Center Lane Markings - Dashed Lines */}
                {type === 'straight' && Array.from({ length: Math.floor(length / 10) }).map((_, i) => (
                    <mesh key={`center-${i}`} position={[0, 0.26, -length / 2 + (i + 0.5) * 10]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[0.4, 3]} />
                        <meshStandardMaterial
                            color="white"
                            emissive="#ffffff"
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                ))}

                {/* Road Edge Lines - Solid */}
                {type === 'straight' && (
                    <>
                        <mesh position={[ROAD_WIDTH / 2 - 0.5, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[0.2, length]} />
                            <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.2} />
                        </mesh>
                        <mesh position={[-ROAD_WIDTH / 2 + 0.5, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[0.2, length]} />
                            <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.2} />
                        </mesh>
                    </>
                )}

                {/* Reflective Cat Eyes / Road Studs */}
                {type === 'straight' && Array.from({ length: Math.floor(length / 5) }).map((_, i) => (
                    <mesh key={`stud-${i}`} position={[0, 0.27, -length / 2 + i * 5]} castShadow>
                        <cylinderGeometry args={[0.1, 0.15, 0.1, 8]} />
                        <meshStandardMaterial
                            color="#ff0000"
                            emissive="#ff0000"
                            emissiveIntensity={1.5}
                            metalness={0.9}
                            roughness={0.1}
                        />
                    </mesh>
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
                        description={`ACADEMIC FOUNDATION\n\nBachelor of Engineering\nSaranathan College of Engineering\nCGPA: 8.13 | 2019 - 2023`}
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
    useBox(() => ({
        type: 'Static',
        position: [position[0], position[1] - 0.25, position[2]],
        args: [size, 0.5, size],
        material: {
            friction: 0.3, // Lower friction for drifting
            restitution: 0.0,
        }
    }));
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
            description: "ACADEMIC FOUNDATION\n\nBachelor of Engineering\nSaranathan College of Engineering\nCGPA: 8.13 | 2019 - 2023"
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
