import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import WireframeBuilding from './WireframeBuilding';

const Scene3D = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -5,
            pointerEvents: 'none'
        }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                {/* Global Ambience */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Scroll Controls to sync with page scroll */}
                {/* pages should roughly match the total height of the App content */}
                <ScrollControls pages={8} damping={0.2}>
                    <Scroll>
                        {/* Hero Section Element */}
                        <WireframeBuilding position={[1.5, 0, 0]} />

                        {/* Additional atmospheric elements could go here */}

                        {/* Additional atmospheric elements could go here */}
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    );
};

export default Scene3D;
