import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WireframeBuilding = (props) => {
    const groupRef = useRef();

    // Animation State
    const [progress, setProgress] = useState(0);

    useFrame((state, delta) => {
        // Increment progress up to 1
        if (progress < 1) {
            setProgress(prev => Math.min(prev + delta * 0.2, 1)); // 5 seconds to complete
        }

        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05; // Very slow rotation
        }
    });

    // Helper to map progress to a range [start, end] -> [0, 1]
    const getPhase = (start, end) => {
        return THREE.MathUtils.clamp((progress - start) / (end - start), 0, 1);
    };

    // Phases
    const foundationPhase = getPhase(0, 0.2);
    const structurePhase = getPhase(0.2, 0.5);
    const massingPhase = getPhase(0.5, 0.8);
    const facadePhase = getPhase(0.8, 1.0);

    return (
        <group ref={groupRef} {...props}>
            {/* 1. Grid & Foundation */}
            <gridHelper
                args={[4, 10]}
                position={[0, -1.5, 0]}
                material-opacity={foundationPhase * 0.2}
                material-transparent
                material-color="#ffffff"
            />
            <mesh position={[0, -1.55, 0]}>
                <boxGeometry args={[1.2, 0.1, 1.2]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={foundationPhase * 0.5} />
            </mesh>

            {/* 2. Structural Frame (Columns/Beams) */}
            <group scale={[1, structurePhase, 1]} position={[0, -1.5 + (1.5 * structurePhase), 0]}>
                {/* Main Columns */}
                <mesh position={[-0.45, 0, -0.45]}>
                    <boxGeometry args={[0.05, 3, 0.05]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
                </mesh>
                <mesh position={[0.45, 0, -0.45]}>
                    <boxGeometry args={[0.05, 3, 0.05]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
                </mesh>
                <mesh position={[-0.45, 0, 0.45]}>
                    <boxGeometry args={[0.05, 3, 0.05]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
                </mesh>
                <mesh position={[0.45, 0, 0.45]}>
                    <boxGeometry args={[0.05, 3, 0.05]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
                </mesh>
            </group>

            {/* 3. Massing Form (Transparent Slabs/Volume) */}
            <mesh position={[0, 0, 0]} scale={[0.9, 0.98, 0.9]}>
                <boxGeometry args={[1, 3, 1]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={massingPhase * 0.05} />
            </mesh>
            {/* Internal Floors */}
            {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[0, -1.2 + (i * 0.5), 0]} scale={[1, 1, 1]}>
                    <boxGeometry args={[0.9, 0.02, 0.9]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={massingPhase * 0.3} />
                </mesh>
            ))}

            {/* 4. Facade Lines (Exterior Outline) */}
            <lineSegments position={[0, 0, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(1, 3, 1)]} />
                <lineBasicMaterial color="#ffffff" linewidth={1} transparent opacity={facadePhase * 0.8} />
            </lineSegments>
            {/* Offset Detail Facade */}
            <lineSegments position={[0.2, -0.5, 0.2]}>
                <edgesGeometry args={[new THREE.BoxGeometry(1, 2, 1)]} />
                <lineBasicMaterial color="#ffffff" linewidth={1} transparent opacity={facadePhase * 0.5} />
            </lineSegments>

        </group>
    );
};

export default WireframeBuilding;
