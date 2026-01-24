import { useBox } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { Vector3, Quaternion } from "three";

function useControls() {
    const [controls, setControls] = useState({ forward: false, backward: false, left: false, right: false, brake: false, reset: false });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case 'w': case 'arrowup': setControls(c => ({ ...c, forward: true })); break;
                case 's': case 'arrowdown': setControls(c => ({ ...c, backward: true })); break;
                case 'a': case 'arrowleft': setControls(c => ({ ...c, left: true })); break;
                case 'd': case 'arrowright': setControls(c => ({ ...c, right: true })); break;
                case ' ': setControls(c => ({ ...c, brake: true })); break;
                case 'r': setControls(c => ({ ...c, reset: true })); break;
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case 'w': case 'arrowup': setControls(c => ({ ...c, forward: false })); break;
                case 's': case 'arrowdown': setControls(c => ({ ...c, backward: false })); break;
                case 'a': case 'arrowleft': setControls(c => ({ ...c, left: false })); break;
                case 'd': case 'arrowright': setControls(c => ({ ...c, right: false })); break;
                case ' ': setControls(c => ({ ...c, brake: false })); break;
                case 'r': setControls(c => ({ ...c, reset: false })); break;
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

export default function Car() {
    const { forward, backward, left, right, brake, reset } = useControls();
    const { camera } = useThree();
    const [ref, api] = useBox(() => ({
        mass: 1, // Reduced from 500
        args: [2, 1, 4],
        linearDamping: 0.1, // Reduced air resistance
        angularDamping: 0.1,
        angularFactor: [0, 1, 0] // Lock X and Z rotation (prevent flipping), allow Y (steering)
    }));

    const velocity = useRef([0, 0, 0]);
    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);

    const quaternion = useRef([0, 0, 0, 1]);
    useEffect(() => api.quaternion.subscribe((q) => (quaternion.current = q)), [api.quaternion]);

    const position = useRef([0, 0, 0]);
    useEffect(() => api.position.subscribe((p) => (position.current = p)), [api.position]);

    useFrame((state, delta) => {
        // FORCE: Keep car parallel to ground. We manually overwrite X/Z rotation to 0.
        // We only want Y rotation (steering) from the physics engine.
        const currentEulerY = new Quaternion(quaternion.current[0], quaternion.current[1], quaternion.current[2], quaternion.current[3]);
        // Extract Y rotation or just rely on physics but zero out X/Z
        // Actually, safer to just set angularFactor (already done) AND explicit rotation fix if it drifts
        // But the user says it is STILL flipping front.
        // This means the torque from movement (force applied at center) acts on the body.
        // Let's explicitly set rotation to only have Y component every frame.

        // However, modifying rotation directly fights physics. 
        // Better: Apply a "stabilizing" function or just rely on angularFactor which SHOULD have worked.
        // If it failed, maybe the api wasn't updated. Let's try re-setting angularFactor explicitly in useFrame or effect.

        // Actually, let's just use the 'fixedRotation' approach via angularFactor again but ensure it propagates.
        // And reduce speed slightly to feel "grounded".

        if (reset) {
            api.position.set(0, 2, 0);
            api.velocity.set(0, 0, 0);
            api.angularVelocity.set(0, 0, 0);
            api.rotation.set(0, 0, 0);
            api.wakeUp();
            return;
        }

        // AGGRESSIVE STABILIZATION:
        // We only allow Y rotation (yaw/steering).
        // To do this correctly, we subscribe to angularVelocity properly (we likely weren't).
        // Since we can't easily get the current angular velocity synchronously without a subscription ref,
        // and subscribing to another loose ref might be complex, we will just rely on angularFactor.

        // HOWEVER, to be safe, let's just NOT overwrite angularVelocity manually if we don't have the ref.
        // The previous bug was: api.angularVelocity.set(0, velocity.current[1], 0); 
        // velocity.current[1] is LINEAR Y velocity (jumping), not ANGULAR Y (turning).

        // So fixing that:
        api.angularFactor.set(0, 1, 0); // This is usually enough if physics works.

        // Let's remove the manual angularVelocity set which was breaking steering.
        // And ensure mass/force is sufficient.

        // Calculate forward direction
        const q = new Quaternion(quaternion.current[0], quaternion.current[1], quaternion.current[2], quaternion.current[3]);

        // Speed Factors (Force) - Restore some power
        const speed = 120;
        const turnSpeed = 40;

        // Movement Logic
        if (forward) {
            api.wakeUp();
            api.applyLocalForce([0, 0, -speed], [0, 0, 0]);
        }
        if (backward) {
            api.wakeUp();
            api.applyLocalForce([0, 0, speed * 0.5], [0, 0, 0]);
        }

        // Steering (Torque)
        if (left) {
            api.wakeUp();
            api.applyTorque([0, turnSpeed, 0]);
        }
        if (right) {
            api.wakeUp();
            api.applyTorque([0, -turnSpeed, 0]);
        }

        // Braking
        if (brake) {
            api.velocity.set(velocity.current[0] * 0.95, velocity.current[1], velocity.current[2] * 0.95);
            api.angularVelocity.set(0, 0, 0);
        }

        // Camera Follow
        // Ideally we want the camera to be behind and slightly above the car
        const camOffset = new Vector3(0, 5, 10).applyQuaternion(q);
        // Smooth camera transition could be done with lerp, but for now hard set to follow
        // For smoother experience, we lerp the camera position to target position

        const targetCamPos = new Vector3(
            position.current[0] + camOffset.x,
            position.current[1] + camOffset.y,
            position.current[2] + camOffset.z
        );

        camera.position.lerp(targetCamPos, delta * 2);
        camera.lookAt(position.current[0], position.current[1], position.current[2]);
    });

    return (
        <mesh ref={ref as any} castShadow>
            <boxGeometry args={[2, 1, 4]} />
            <meshStandardMaterial color="#00ffff" roughness={0.4} metalness={0.6} />
            {/* Visual details for the car */}
            <mesh position={[0, 0.5, 0.5]}>
                <boxGeometry args={[1.8, 0.8, 2]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Headlights */}
            <mesh position={[-0.6, 0, -2.01]}>
                <planeGeometry args={[0.5, 0.3]} />
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
            </mesh>
            <mesh position={[0.6, 0, -2.01]}>
                <planeGeometry args={[0.5, 0.3]} />
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
            </mesh>
            {/* Taillights */}
            <mesh position={[-0.6, 0, 2.01]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[0.5, 0.3]} />
                <meshStandardMaterial color="red" emissive="red" emissiveIntensity={3} />
            </mesh>
            <mesh position={[0.6, 0, 2.01]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[0.5, 0.3]} />
                <meshStandardMaterial color="red" emissive="red" emissiveIntensity={3} />
            </mesh>
        </mesh>
    );
}
