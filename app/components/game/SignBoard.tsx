import { Text } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

export default function SignBoard({ position, rotation, title, description, color }: any) {
    // Physical posts (static so the car can crash into them)
    const [ref] = useBox(() => ({ type: 'Static', position, rotation, args: [8.5, 5, 1] }));

    return (
        <group position={position} rotation={rotation}>
            {/* The Board Mesh - Visuals */}
            <mesh position={[0, 2.5, 0]}>
                <boxGeometry args={[8, 3, 0.2]} />
                <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Glow Border */}
            <mesh position={[0, 2.5, -0.05]}>
                <boxGeometry args={[8.2, 3.2, 0.1]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>

            {/* Posts */}
            <mesh position={[-3, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 5]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[3, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 5]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Text */}
            <Text
                position={[0, 3.0, 0.2]}
                fontSize={0.8}
                color={color}
                anchorX="center"
                anchorY="middle"
            >
                {title}
            </Text>
            <Text
                position={[0, 2.0, 0.2]}
                fontSize={0.25}
                color="white"
                maxWidth={7}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                {description}
            </Text>
        </group>
    );
}
