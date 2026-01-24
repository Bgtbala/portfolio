import { usePlane, useBox } from "@react-three/cannon";

function Boundary({ position, args }: { position: [number, number, number], args: [number, number, number] }) {
    useBox(() => ({ position, args, type: 'Static', friction: 0 }));
    return (
        <mesh position={position}>
            <boxGeometry args={args} />
            <meshStandardMaterial color="#222" transparent opacity={0.5} visible={false} />
        </mesh>
    );
}

export default function Road() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.01, 0],
        type: 'Static',
        material: 'ground',
        friction: 0.1
    }));

    const roadWidth = 60;
    const roadLength = 2000;

    return (
        <group>
            {/* Main Floor */}
            <mesh ref={ref as any} receiveShadow>
                <planeGeometry args={[roadWidth, roadLength]} />
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.5} />
            </mesh>

            {/* Extended Dark Floor (Visual Only, to hide void) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                <planeGeometry args={[1000, 1000]} />
                <meshBasicMaterial color="#050505" />
            </mesh>

            {/* Road Markings */}
            {/* Central Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <planeGeometry args={[0.5, roadLength]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
            </mesh>

            {/* Side Lines (Neon Borders) */}
            {/* Left */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-roadWidth / 2 + 1, 0.02, 0]}>
                <planeGeometry args={[0.5, roadLength]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
            </mesh>
            {/* Right */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[roadWidth / 2 - 1, 0.02, 0]}>
                <planeGeometry args={[0.5, roadLength]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
            </mesh>

            {/* Physical Barriers (Invisible Walls) */}
            {/* Left Wall */}
            <Boundary position={[-roadWidth / 2, 2.5, 0]} args={[1, 5, roadLength]} />
            {/* Right Wall */}
            <Boundary position={[roadWidth / 2, 2.5, 0]} args={[1, 5, roadLength]} />
            {/* Back Wall (Start) */}
            <Boundary position={[0, 2.5, 20]} args={[roadWidth, 5, 1]} />
        </group>
    );
}
