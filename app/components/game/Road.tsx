import { useBox } from "@react-three/cannon";
import { Text } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

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

// Reusable Building/Feature Component (High Design: Neon + Glass)
const Building = ({ label, description, color, position, rotation, scale = [1, 1, 1], width = 12 }: any) => {
    const halfW = width / 2;
    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Main Tower Structure (Reduced Height) */}
            <mesh position={[0, 3, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, 6, 12]} />
                <meshStandardMaterial color="#222" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Glass Facade */}
            <mesh position={[0, 3, 6.05]}>
                <planeGeometry args={[width - 1, 5]} />
                <meshPhysicalMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.05}
                    transmission={0.2}
                    thickness={1}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Neon Accents */}
            <mesh position={[0, 6, 0]}>
                <boxGeometry args={[width + 0.2, 0.4, 12.2]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>
            <mesh position={[halfW, 3, 6]}>
                <boxGeometry args={[0.2, 6, 0.2]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>
            <mesh position={[-halfW, 3, 6]}>
                <boxGeometry args={[0.2, 6, 0.2]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>

            {/* Sign */}
            <mesh position={[0, 7.5, 6]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[width - 2, 2.5, 0.5]} />
                <meshStandardMaterial color="#000" metalness={0.8} roughness={0.2} />
            </mesh>
            <Text position={[0, 7.5, 6.3]} rotation={[-0.1, 0, 0]} fontSize={1.2} color="white" anchorX="center" anchorY="middle">
                {label}
            </Text>

            {/* Description/Resume Content Hologram */}
            {description && (
                <group position={[0, 2.5, 8]}>
                    <mesh position={[0, 0, -0.05]}>
                        <planeGeometry args={[width + 6, 4]} />
                        <meshStandardMaterial color="#000" transparent opacity={0.8} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh position={[0, 2, 0]}>
                        <planeGeometry args={[width + 6, 0.1]} />
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
                    </mesh>
                    <Text fontSize={0.8} color="#fff" anchorX="center" anchorY="middle" maxWidth={width + 5} textAlign="center" lineHeight={1.4}>
                        {description}
                    </Text>
                </group>
            )}
        </group>
    );
}

const Wall = ({ position, rotation, side, length }: { position: any, rotation: any, side: 'left' | 'right', length: number }) => {
    const offset = side === 'left' ? -(ROAD_WIDTH / 2 + 1) : (ROAD_WIDTH / 2 + 1);
    const euler = new THREE.Euler(...rotation);
    const offsetVec = new THREE.Vector3(offset, 1, 0).applyEuler(euler);
    const wallPos: [number, number, number] = [
        position[0] + offsetVec.x,
        position[1] + offsetVec.y,
        position[2] + offsetVec.z
    ];

    useBox(() => ({
        type: 'Static',
        position: wallPos,
        rotation: rotation,
        args: [1, 2, length]
    }));

    return (
        <mesh position={wallPos} rotation={rotation}>
            <boxGeometry args={[1, 2, length]} />
            <meshStandardMaterial color="#333" visible={false} />
        </mesh>
    );
};

function RoadSegment({ position, rotation, type, feature, length, description, isDeadEnd }: RoadSegmentProps) {
    useBox(() => ({
        type: 'Static',
        position,
        rotation,
        args: [ROAD_WIDTH, 0.5, length]
    }));

    const renderFeature = () => {
        const offset = ROAD_WIDTH / 2 + 12;
        switch (feature) {
            case 'about':
                return <Building label="ABOUT ME" description={description} color="#ff9900" position={[offset, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />;
            case 'education':
                return <Building label="EDUCATION" description={description} color="#8b5cf6" position={[-offset, 0, 0]} rotation={[0, Math.PI / 2, 0]} />;
            case 'experience':
                // Experience is often at the end, facing the road
                return <Building label="EXPERIENCE" description={description} color="#3b82f6" position={[0, 0, -offset]} rotation={[0, 0, 0]} />;
            case 'skills':
                return <Building label="SKILLS" description={description} color="#10b981" position={[offset, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />;
            case 'projects':
                return <Building label="PROJECTS" description={description} color="#ef4444" position={[-offset, 0, 0]} rotation={[0, Math.PI / 2, 0]} />;
            case 'contact':
                // Contact building at end of its road - Widened to fit email/linkedin
                return <Building label="CONTACT" description={description} color="#f59e0b" position={[0, 0, -offset]} rotation={[0, 0, 0]} width={22} />;
            case 'skills_projects':
                return (
                    <group>
                        <Building
                            label="SKILLS"
                            description={`STACK:
• React, Next.js, TypeScript
• Node.js, Express, MongoDB
• AWS, Docker, Socket.io`}
                            color="#10b981"
                            position={[offset, 0, 0]}
                            rotation={[0, -Math.PI / 2, 0]}
                        />
                        <Building
                            label="PROJECTS"
                            description={`PROJECTS:
• Filmox
• Vaidyog
• GOG Eco
• Samurai`}
                            color="#ef4444"
                            position={[-offset, 0, 0]}
                            rotation={[0, Math.PI / 2, 0]}
                        />
                    </group>
                );
            default: return null;
        }
    }

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
                    <mesh key={i} position={[0, 0.26, -length / 2 + (i + 0.5) * 10]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[0.5, 2]} />
                        <meshStandardMaterial color="white" />
                    </mesh>
                ))}

                {type !== 'intersection' && type !== '3-way-left-right' && (
                    <>
                        {!isLeftFeature && (
                            <mesh position={[-(ROAD_WIDTH / 2 - 1), 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                                <planeGeometry args={[0.5, length]} />
                                <meshStandardMaterial color="yellow" />
                            </mesh>
                        )}
                        {!isRightFeature && (
                            <mesh position={[(ROAD_WIDTH / 2 - 1), 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                                <planeGeometry args={[0.5, length]} />
                                <meshStandardMaterial color="yellow" />
                            </mesh>
                        )}
                    </>
                )}

                {renderFeature()}
            </group>

            {type === 'straight' && (
                <>
                    {!isLeftFeature && <Wall position={position} rotation={rotation} side="left" length={length} />}
                    {!isRightFeature && <Wall position={position} rotation={rotation} side="right" length={length} />}
                </>
            )}

            {isDeadEnd && (
                <Wall position={position} rotation={[rotation[0], rotation[1] + Math.PI / 2, rotation[2]]} side="left" length={ROAD_WIDTH} />
            )}
        </group>
    );
}

// Stadium-style Drifting Arena
const DriftArena = ({ position }: { position: [number, number, number] }) => {
    const size = 300;
    const wallHeight = 15;
    const gapWidth = 40;

    // Physics Plane
    useBox(() => ({
        type: 'Static',
        position: [position[0], position[1] - 0.25, position[2]],
        args: [size, 0.5, size]
    }));

    const sideWallWidth = (size - gapWidth) / 2;

    // Walls Physics
    useBox(() => ({ type: 'Static', position: [position[0], wallHeight / 2, position[2] - size / 2], args: [size, wallHeight, 4] }));
    useBox(() => ({ type: 'Static', position: [position[0] - size / 2 + sideWallWidth / 2, wallHeight / 2, position[2] + size / 2], args: [sideWallWidth, wallHeight, 4] }));
    useBox(() => ({ type: 'Static', position: [position[0] + size / 2 - sideWallWidth / 2, wallHeight / 2, position[2] + size / 2], args: [sideWallWidth, wallHeight, 4] }));
    useBox(() => ({ type: 'Static', position: [position[0] + size / 2, wallHeight / 2, position[2]], args: [4, wallHeight, size] }));
    useBox(() => ({ type: 'Static', position: [position[0] - size / 2, wallHeight / 2, position[2]], args: [4, wallHeight, size] }));

    return (
        <group position={position}>
            {/* Standard Brown Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[size, size]} />
                <meshStandardMaterial color="#a67c52" roughness={0.8} metalness={0.1} />
            </mesh>

            {/* Stadium Walls Visuals */}
            <mesh position={[0, wallHeight / 2, -size / 2]}>
                <boxGeometry args={[size, wallHeight, 2]} />
                <meshStandardMaterial color="#333" metalness={0.5} roughness={0.2} />
            </mesh>
            <mesh position={[-size / 2 + sideWallWidth / 2, wallHeight / 2, size / 2]}>
                <boxGeometry args={[sideWallWidth, wallHeight, 2]} />
                <meshStandardMaterial color="#333" metalness={0.5} roughness={0.2} />
            </mesh>
            <mesh position={[size / 2 - sideWallWidth / 2, wallHeight / 2, size / 2]}>
                <boxGeometry args={[sideWallWidth, wallHeight, 2]} />
                <meshStandardMaterial color="#333" metalness={0.5} roughness={0.2} />
            </mesh>
            <mesh position={[size / 2, wallHeight / 2, 0]}>
                <boxGeometry args={[2, wallHeight, size]} />
                <meshStandardMaterial color="#333" metalness={0.5} roughness={0.2} />
            </mesh>
            <mesh position={[-size / 2, wallHeight / 2, 0]}>
                <boxGeometry args={[2, wallHeight, size]} />
                <meshStandardMaterial color="#333" metalness={0.5} roughness={0.2} />
            </mesh>

            {/* ENTRANCE BANNER */}
            <group position={[0, wallHeight + 5, size / 2]}>
                <mesh>
                    <boxGeometry args={[gapWidth + 10, 8, 1]} />
                    <meshStandardMaterial color="#000" metalness={0.8} roughness={0.2} />
                </mesh>
                <Text position={[0, 0, 0.6]} fontSize={4} color="#00ff88">
                    FREE ROAM ARENA
                </Text>
                {/* Banner Supports */}
                <mesh position={[gapWidth / 2 + 3, -10, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 20]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
                <mesh position={[-gapWidth / 2 - 3, -10, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 20]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
            </group>

            {/* STADIUM FLOODLIGHTS */}
            {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => (
                <group key={i} position={[x * (size / 2 - 10), 0, z * (size / 2 - 10)]}>
                    <mesh position={[0, 25, 0]}>
                        <boxGeometry args={[2, 50, 2]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                    <mesh position={[0, 50, 0]}>
                        <boxGeometry args={[10, 6, 2]} />
                        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={10} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

export default function Road() {
    const roadSegments = useMemo(() => {
        const segments: RoadSegmentProps[] = [];

        // --- INITIAL PATH (FACING -Z) ---
        segments.push({ position: [0, -0.1, 20], rotation: [0, 0, 0], type: 'straight', feature: 'start', length: 20 });
        segments.push({ position: [0, -0.1, 0], rotation: [0, 0, 0], type: 'straight', feature: 'about', length: 20, description: "PROTOCOL:\n1+ Years MERN & Next.js\nBuilding scalable applications\nAWS & API Optimization" });
        segments.push({ position: [0, -0.1, -20], rotation: [0, 0, 0], type: 'straight', feature: 'none', length: 20 });
        segments.push({ position: [0, -0.1, -40], rotation: [0, 0, 0], type: 'straight', feature: 'education', length: 20, description: "EDUCATION:\n• Bachelor of Engineering\n• Saranathan College of Engineering\n• CGPA: 8.13 | 2019-2023" });

        // --- 3-WAY JUNCTION ---
        segments.push({ position: [0, -0.1, -60], rotation: [0, 0, 0], type: 'intersection', feature: 'none', length: 20 });

        // --- RIGHT BRANCH: CONTACT ---
        segments.push({ position: [20, -0.1, -60], rotation: [0, -Math.PI / 2, 0], type: 'straight', feature: 'contact', length: 20, isDeadEnd: true, description: "GET IN TOUCH:\ne: balagangatharan17@gmail.com\nw: www.linkedin.com/in/balagangatharan17" });

        // --- LEFT BRANCH: EXPERIENCE PATH ---
        segments.push({ position: [-20, -0.1, -60], rotation: [0, Math.PI / 2, 0], type: 'straight', feature: 'none', length: 20 });
        segments.push({ position: [-40, -0.1, -60], rotation: [0, Math.PI / 2, 0], type: 'straight', feature: 'skills_projects', length: 20 });
        segments.push({
            position: [-60, -0.1, -60],
            rotation: [0, Math.PI / 2, 0],
            type: 'straight',
            feature: 'experience',
            length: 20,
            isDeadEnd: true,
            description: "CAREER:\n• Software Engineer (MERN)\n• Kods Technology Pvt. Ltd.\n• Jul 2024 — Present"
        });

        // --- DRIFT ARENA PATH (STRAIGHT AHEAD FROM JUNCTION) ---
        // Path starts at junction (0, -60) and leads to the Arena
        for (let i = 1; i <= 7; i++) {
            segments.push({ position: [0, -0.1, -60 - (i * 20)], rotation: [0, 0, 0], type: 'straight', feature: 'none', length: 20 });
        }

        return segments;
    }, []);

    return (
        <group>
            {roadSegments.map((seg, i) => (
                <RoadSegment
                    key={i}
                    position={seg.position as [number, number, number]}
                    rotation={seg.rotation as [number, number, number]}
                    type={seg.type}
                    feature={seg.feature}
                    length={seg.length}
                    description={seg.description}
                    isDeadEnd={seg.isDeadEnd}
                />
            ))}

            {/* Shifted back to -340 to ensure deep overlap with road end at -200 */}
            <DriftArena position={[0, -0.1, -340]} />
        </group>
    );
}
