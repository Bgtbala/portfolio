import { useCompoundBody } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3, Quaternion } from "three";
import * as THREE from "three";

function useControls() {
    const controls = useRef({ forward: false, backward: false, left: false, right: false, brake: false, reset: false });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case 'w': case 'arrowup': controls.current.forward = true; break;
                case 's': case 'arrowdown': controls.current.backward = true; break;
                case 'a': case 'arrowleft': controls.current.left = true; break;
                case 'd': case 'arrowright': controls.current.right = true; break;
                case ' ': controls.current.brake = true; break;
                case 'r': controls.current.reset = true; break;
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case 'w': case 'arrowup': controls.current.forward = false; break;
                case 's': case 'arrowdown': controls.current.backward = false; break;
                case 'a': case 'arrowleft': controls.current.left = false; break;
                case 'd': case 'arrowright': controls.current.right = false; break;
                case ' ': controls.current.brake = false; break;
                case 'r': controls.current.reset = false; break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    return controls;
}

const Wheel = ({ position, rotation = [Math.PI / 2, 0, Math.PI / 2] }: any) => (
    <group position={position}>
        {/* Tire */}
        <mesh rotation={rotation}>
            <cylinderGeometry args={[0.45, 0.45, 0.3, 24]} />
            <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
            {/* Rim */}
            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.3, 0.35, 0.32, 12]} />
                <meshStandardMaterial color="#666" metalness={1} roughness={0.1} />
            </mesh>
            {/* Glow Core */}
            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.35, 12]} />
                <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
            </mesh>
        </mesh>
    </group>
);

export default function Car() {
    const controlsIdx = useControls();
    const { camera } = useThree();

    // Car Body Physics - HEAVY & GROUNDED
    const [ref, api] = useCompoundBody(() => ({
        mass: 500, // Significant weight to prevent lifting
        position: [0, 0.95, 20], // Spawning on the start segment
        rotation: [0, 0, 0],
        linearDamping: 0.5,
        angularDamping: 0.99, // High damping to stop unnecessary spinning
        allowSleep: false,
        fixedRotation: false,
        angularFactor: [0, 1, 0], // LOCK X and Z rotation - NO MORE JUMPING/FLIPPING
        shapes: [
            { type: 'Box', args: [1.8, 0.4, 4.4], position: [0, 0.2, 0] }, // Lowered Center of Mass
            // Traction spheres
            { type: 'Sphere', args: [0.5], position: [-0.8, -0.35, -1.2] },
            { type: 'Sphere', args: [0.5], position: [0.8, -0.35, -1.2] },
            { type: 'Sphere', args: [0.5], position: [-0.8, -0.35, 1.2] },
            { type: 'Sphere', args: [0.5], position: [0.8, -0.35, 1.2] },
        ]
    }));

    const velocity = useRef([0, 0, 0]);
    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);
    const quaternion = useRef([0, 0, 0, 1]);
    useEffect(() => api.quaternion.subscribe((q) => (quaternion.current = q)), [api.quaternion]);
    const position = useRef([0, 0, 0]);
    useEffect(() => api.position.subscribe((p) => (position.current = p)), [api.position]);
    const steering = useRef(0);
    const throttle = useRef(0);

    useFrame((state, delta) => {
        const { forward, backward, left, right, brake, reset } = controlsIdx.current;

        if (reset) {
            api.position.set(0, 0.95, 20);
            api.velocity.set(0, 0, 0);
            api.angularVelocity.set(0, 0, 0);
            api.rotation.set(0, 0, 0);
            steering.current = 0;
            throttle.current = 0;
            api.wakeUp();
            return;
        }

        // --- FORCES & ACCELERATION ---
        const driveForce = 180000; // Increased to reach higher top speed
        const turnTorque = 120000;

        // Custom Acceleration Ramp (Throttle) - Snappy delivery
        const targetThrottle = forward ? 1 : backward ? -0.7 : 0;
        throttle.current = THREE.MathUtils.lerp(throttle.current, targetThrottle, delta * 2.0);

        if (forward || backward || left || right) {
            api.wakeUp();
        }

        // Apply constant Downforce to keep it glued to the road/sand
        api.applyLocalForce([0, -15000, 0], [0, 0, 0]);

        // Smooth Power Application
        if (Math.abs(throttle.current) > 0.01) {
            api.applyLocalForce([0, 0, -throttle.current * driveForce], [0, 0, 0]);
        }

        // SMOOTH INTERPOLATED STEERING
        const targetSteering = left ? 1 : right ? -1 : 0;
        steering.current = THREE.MathUtils.lerp(steering.current, targetSteering, delta * 8);

        // Deadzone to ensure absolute zero when not pressing keys
        if (Math.abs(steering.current) < 0.01) {
            steering.current = 0;
        }

        if (steering.current !== 0) {
            api.applyTorque([0, steering.current * turnTorque, 0]);

            const velocityZ = velocity.current[2];
            const lateralForce = steering.current * Math.abs(velocityZ) * 5000;
            api.applyLocalForce([-lateralForce, 0, 0], [0, 0, 0]);
        }

        // Brake
        if (brake) {
            api.velocity.set(velocity.current[0] * 0.9, velocity.current[1], velocity.current[2] * 0.9);
        }

        // Top Speed - INCREASED more by 40% (16 -> 23)
        const maxSpeed = 23;
        const currentSpeedSq = velocity.current[0] ** 2 + velocity.current[2] ** 2;
        if (currentSpeedSq > maxSpeed ** 2) {
            const ratio = maxSpeed / Math.sqrt(currentSpeedSq);
            api.velocity.set(velocity.current[0] * ratio, velocity.current[1], velocity.current[2] * ratio);
        }

        // Smooth Camera Follow
        const q = new Quaternion(...quaternion.current);
        const camOffset = new Vector3(0, 5, 12).applyQuaternion(q);
        const targetPos = new Vector3(position.current[0] + camOffset.x, position.current[1] + camOffset.y, position.current[2] + camOffset.z);
        camera.position.lerp(targetPos, 0.1);
        camera.lookAt(position.current[0], position.current[1] + 1, position.current[2]);
    });

    const bodyColor = "#f3f4f6"; // Premium Silver White

    return (
        <group ref={ref as any}>
            {/* --- PREMIUM SPORTS CAR DESIGN --- */}

            {/* Base Chassis */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.0, 0.3, 4.8]} />
                <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Aerodynamic Cockpit Glass */}
            <mesh position={[0, 0.45, -0.2]}>
                <boxGeometry args={[1.5, 0.7, 2.0]} />
                <meshPhysicalMaterial color="#111" metalness={1} roughness={0} transparent opacity={0.6} transmission={0.9} thickness={2} />
            </mesh>

            {/* Nose Slant */}
            <mesh position={[0, 0.1, -1.8]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[1.95, 0.4, 1.5]} />
                <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Rear Slant / Engine Bay */}
            <mesh position={[0, 0.25, 1.6]} rotation={[-0.3, 0, 0]}>
                <boxGeometry args={[1.8, 0.5, 2.0]} />
                <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Carbon Fiber Side Insets */}
            <mesh position={[1, 0.1, 0]}>
                <boxGeometry args={[0.05, 0.5, 3.5]} />
                <meshStandardMaterial color="#222" roughness={0.8} />
            </mesh>
            <mesh position={[-1, 0.1, 0]}>
                <boxGeometry args={[0.05, 0.5, 3.5]} />
                <meshStandardMaterial color="#222" roughness={0.8} />
            </mesh>

            {/* Headlights (Laser Strips) */}
            <mesh position={[-0.7, 0.1, -2.4]}>
                <boxGeometry args={[0.5, 0.05, 0.05]} />
                <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={5} />
            </mesh>
            <mesh position={[0.7, 0.1, -2.4]}>
                <boxGeometry args={[0.5, 0.05, 0.05]} />
                <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={5} />
            </mesh>

            {/* Tail Light Bar */}
            <mesh position={[0, 0.3, 2.41]}>
                <boxGeometry args={[1.9, 0.1, 0.05]} />
                <meshStandardMaterial color="red" emissive="red" emissiveIntensity={5} />
            </mesh>

            {/* Neon Underglow */}
            <mesh position={[0, -0.15, 0]}>
                <boxGeometry args={[1.6, 0.05, 3.5]} />
                <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={4} transparent opacity={0.5} />
            </mesh>

            {/* Spoiler Wing */}
            <group position={[0, 0.7, 2.2]}>
                <mesh>
                    <boxGeometry args={[2.2, 0.05, 0.8]} />
                    <meshStandardMaterial color="#222" metalness={0.8} />
                </mesh>
                <mesh position={[0.9, -0.3, 0]}>
                    <boxGeometry args={[0.05, 0.6, 0.2]} />
                    <meshStandardMaterial color={bodyColor} />
                </mesh>
                <mesh position={[-0.9, -0.3, 0]}>
                    <boxGeometry args={[0.05, 0.6, 0.2]} />
                    <meshStandardMaterial color={bodyColor} />
                </mesh>
            </group>

            {/* Visual Wheels */}
            <Wheel position={[-1, -0.3, -1.4]} />
            <Wheel position={[1, -0.3, -1.4]} />
            <Wheel position={[-1, -0.3, 1.4]} />
            <Wheel position={[1, -0.3, 1.4]} />
        </group>
    );
}
