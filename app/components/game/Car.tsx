import { useCompoundBody } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3, Quaternion } from "three";
import * as THREE from "three";

function useControls() {
    const controls = useRef({ forward: false, backward: false, left: false, right: false, brake: false, reset: false, nitro: false });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case 'w': case 'arrowup': controls.current.forward = true; break;
                case 's': case 'arrowdown': controls.current.backward = true; break;
                case 'a': case 'arrowleft': controls.current.left = true; break;
                case 'd': case 'arrowright': controls.current.right = true; break;
                case ' ': controls.current.brake = true; break;
                case 'r': controls.current.reset = true; break;
                case 'shift': controls.current.nitro = true; break;
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
                case 'shift': controls.current.nitro = false; break;
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

import { useGameStore } from "./GameState";

export default function Car() {
    const controlsIdx = useControls();
    const { camera } = useThree();
    const { setSpeed, setNitro, nitroActive, addDriftPoints, setCarPosition } = useGameStore();

    // Car Body Physics - Bruno Simon-style smooth physics
    const [ref, api] = useCompoundBody(() => ({
        mass: 150, // Lighter for more responsive, arcade-like feel
        position: [0, 0.95, 20],
        rotation: [0, 0, 0],
        linearDamping: 0.3, // Higher for more controlled movement
        angularDamping: 0.8, // Slightly lower for smoother rotation
        allowSleep: false,
        fixedRotation: false,
        angularFactor: [0, 1, 0],
        material: {
            friction: 0.3,
            restitution: 0.1, // Low bounce
        },
        shapes: [
            { type: 'Box', args: [1.8, 0.6, 4.4], position: [0, 0.2, 0] },
            // Wheel spheres for smooth ground contact
            { type: 'Sphere', args: [0.4], position: [-0.8, -0.3, -1.2] },
            { type: 'Sphere', args: [0.4], position: [0.8, -0.3, -1.2] },
            { type: 'Sphere', args: [0.4], position: [-0.8, -0.3, 1.2] },
            { type: 'Sphere', args: [0.4], position: [0.8, -0.3, 1.2] },
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
    const driftAccumulator = useRef(0);
    const lastUpdate = useRef(0);

    useFrame((state, delta) => {
        const { forward, backward, left, right, brake, reset, nitro } = controlsIdx.current;

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

        // --- FORCES & ACCELERATION - Bruno Simon style ---
        const nitroMult = (nitro && forward || nitroActive) ? 1.6 : 1.0;
        const driveForce = 25000 * nitroMult; // Lighter car needs less force
        const turnTorque = 15000; // Proportional to lighter mass

        // Update Game State - Smooth updates for HUD
        const currentSpeed = Math.sqrt(velocity.current[0] ** 2 + velocity.current[2] ** 2);
        // Use 3.6 multiplier to convert m/s to km/h (standard)
        const displaySpeed = Math.floor(currentSpeed * 3.6);

        setSpeed(displaySpeed);

        if (state.clock.elapsedTime - lastUpdate.current > 0.1) {
            setCarPosition(position.current as [number, number, number]);
            if (nitroActive !== (nitro && forward) && !nitroActive) setNitro(nitro && forward);
            lastUpdate.current = state.clock.elapsedTime;
        }

        // --- DRIFT SCORING ---
        if (currentSpeed > 5) {
            const vDir = new THREE.Vector3(velocity.current[0], 0, velocity.current[2]).normalize();
            const carDir = new THREE.Vector3(0, 0, -1).applyQuaternion(new THREE.Quaternion(...quaternion.current));
            const angle = Math.abs(vDir.dot(carDir));

            if (angle < 0.85) { // Sideways enough
                driftAccumulator.current += delta * currentSpeed * 15;
                if (driftAccumulator.current > 10) {
                    addDriftPoints(Math.floor(driftAccumulator.current));
                    driftAccumulator.current = 0;
                }
            } else {
                driftAccumulator.current = 0;
            }
        }

        // Custom Acceleration Ramp - Responsive but smooth
        const targetThrottle = forward ? 1 : backward ? -1 : 0;
        // Much faster response for immediate input feedback
        const throttleLerpSpeed = 15.0; // Increased from 8.0 for instant response
        throttle.current = THREE.MathUtils.lerp(throttle.current, targetThrottle, Math.min(delta * throttleLerpSpeed, 1));

        if (forward || backward || left || right) {
            api.wakeUp();
        }

        // Downforce - proportional to speed like real aerodynamics
        const downforce = -800 * (1 + currentSpeed * 0.1); // Scales with speed
        api.applyLocalForce([0, downforce, 0], [0, 0, 0]);

        // Smooth Power Application
        if (Math.abs(throttle.current) > 0.01) {
            api.applyLocalForce([0, 0, -throttle.current * driveForce], [0, 0, 0]);
        }

        // RESPONSIVE STEERING - Immediate at low speed, smooth at high speed
        const targetSteering = left ? 1 : right ? -1 : 0;
        // Much faster steering response for better control
        const steeringSpeed = currentSpeed > 25 ? 8.0 : currentSpeed > 15 ? 12.0 : 20.0;
        steering.current = THREE.MathUtils.lerp(steering.current, targetSteering, Math.min(delta * steeringSpeed, 1));

        // Deadzone
        if (Math.abs(steering.current) < 0.01) {
            steering.current = 0;
        }

        if (steering.current !== 0) {
            // Apply torque for rotation - Bruno Simon-style progressive scaling
            const speedFactor = Math.min(currentSpeed / 30, 1.0);
            const torqueMultiplier = 0.5 + speedFactor * 0.5; // 0.5 to 1.0 range
            api.applyTorque([0, steering.current * turnTorque * torqueMultiplier, 0]);

            // Lateral grip simulation - realistic tire physics
            const lateralDir = new THREE.Vector3(1, 0, 0).applyQuaternion(new THREE.Quaternion(...quaternion.current));
            const velocityVec = new THREE.Vector3(velocity.current[0], 0, velocity.current[2]);
            const dotLateral = velocityVec.dot(lateralDir);

            // Counter lateral slip - progressive grip
            const gripStrength = 2000 + currentSpeed * 50; // Increases with speed
            if (Math.abs(dotLateral) > 0.05) {
                api.applyLocalForce([-dotLateral * gripStrength, 0, 0], [0, 0, 0]);
            }

            // Turning force - helps the car follow the turn direction
            const turnForce = steering.current * currentSpeed * 400;
            api.applyLocalForce([-turnForce, 0, 0], [0, 0, 0]);
        }

        // Brake - Progressive braking like real cars
        if (brake) {
            const brakeStrength = 0.96; // Smooth progressive braking
            api.velocity.set(
                velocity.current[0] * brakeStrength,
                velocity.current[1],
                velocity.current[2] * brakeStrength
            );
        }

        // Top Speed - Realistic speed limiting with smooth falloff
        const baseTopSpeed = 40; // ~144 km/h
        const maxSpeed = baseTopSpeed * nitroMult;
        const currentSpeedSq = velocity.current[0] ** 2 + velocity.current[2] ** 2;
        if (currentSpeedSq > maxSpeed ** 2) {
            // Smooth speed capping without harsh cutoff
            const ratio = maxSpeed / Math.sqrt(currentSpeedSq);
            const smoothRatio = THREE.MathUtils.lerp(1, ratio, 0.1);
            api.velocity.set(
                velocity.current[0] * smoothRatio,
                velocity.current[1],
                velocity.current[2] * smoothRatio
            );
        }

        // Smooth Camera Follow - Bruno Simon-style camera
        const q = new Quaternion(...quaternion.current);
        const camOffset = new Vector3(0, 4, 10).applyQuaternion(q);
        const targetPos = new Vector3(
            position.current[0] + camOffset.x,
            position.current[1] + camOffset.y,
            position.current[2] + camOffset.z
        );
        // Smoother camera interpolation
        camera.position.lerp(targetPos, 0.08);

        // Smooth look-at target
        const lookAtTarget = new Vector3(
            position.current[0],
            position.current[1] + 1,
            position.current[2]
        );
        camera.lookAt(lookAtTarget);

        // Speed FOV scaling - Subtle Bruno Simon-style effect
        const pCam = camera as THREE.PerspectiveCamera;
        if (pCam.isPerspectiveCamera) {
            const targetFov = 60 + (currentSpeed * 0.3);
            pCam.fov = THREE.MathUtils.lerp(pCam.fov, targetFov, 0.05);
            pCam.updateProjectionMatrix();
        }
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
