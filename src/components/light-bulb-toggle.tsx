import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { SpotLight, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import Matter from 'matter-js';

interface BulbProps {
    isOn: boolean;
    toggleLight: () => void;
}

interface RopeProps {
    startPoint: { x: number; y: number };
    endPoint: { x: number; y: number };
}

const Bulb: React.FC<BulbProps> = ({ isOn, toggleLight }) => {
    const spotLight = useRef<THREE.SpotLight>(null);
    const bulbMesh = useRef<THREE.Mesh>(null);
    useHelper(spotLight as React.MutableRefObject<THREE.SpotLight>, THREE.SpotLightHelper);

    useFrame(() => {
        if (bulbMesh.current && spotLight.current) {
            const material = bulbMesh.current.material;
            if (material instanceof THREE.MeshStandardMaterial) {
                if (isOn) {
                    material.emissive.setHex(0xffffee);
                    spotLight.current.intensity = 1;
                } else {
                    material.emissive.setHex(0x000000);
                    spotLight.current.intensity = 0;
                }
            }
        }
    });

    return (
        <group onClick={toggleLight}>
            <mesh ref={bulbMesh} position={[0, -2, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={0xffffee} />
            </mesh>
            <SpotLight
                ref={spotLight}
                position={[0, -1.5, 0]}
                angle={0.6}
                penumbra={0.5}
                intensity={isOn ? 1 : 0}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
        </group>
    );
};

const Rope: React.FC<RopeProps> = ({ startPoint, endPoint }) => {
    const points = [];
    for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        points.push(new THREE.Vector3(
            startPoint.x * (1 - t) + endPoint.x * t,
            startPoint.y * (1 - t) + endPoint.y * t,
            0
        ));
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line>
            <bufferGeometry attach="geometry" {...lineGeometry} />
            <lineBasicMaterial attach="material" color={0x888888} linewidth={2} />
        </line>
    );
};

const PhysicsScene: React.FC = () => {
    const [bulbPosition, setBulbPosition] = useState({ x: 0, y: -2 });
    const { theme, setTheme } = useTheme();
    const [isOn, setIsOn] = useState(theme === 'dark');

    useEffect(() => {
        const engine = Matter.Engine.create();
        const world = engine.world;

        const ceiling = Matter.Bodies.rectangle(0, 10, 20, 0.1, { isStatic: true });
        const bulb = Matter.Bodies.circle(0, -2, 0.5, {
            density: 0.001,
            frictionAir: 0.05,
        });
        const constraint = Matter.Constraint.create({
            pointA: { x: 0, y: 10 },
            bodyB: bulb,
            stiffness: 0.01,
            damping: 0.05,
        });

        Matter.Composite.add(world, [ceiling, bulb, constraint]);

        Matter.Events.on(engine, 'afterUpdate', () => {
            setBulbPosition({ x: bulb.position.x, y: bulb.position.y });
        });

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        return () => {
            Matter.Runner.stop(runner);
            Matter.World.clear(world, false);
            Matter.Engine.clear(engine);
        };
    }, []);

    const toggleLight = () => {
        setIsOn(!isOn);
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <>
            <Rope startPoint={{ x: 0, y: 10 }} endPoint={bulbPosition} />
            <group position={[bulbPosition.x, bulbPosition.y, 0]}>
                <Bulb isOn={isOn} toggleLight={toggleLight} />
            </group>
        </>
    );
};

const AdvancedLightBulb: React.FC = () => {
    return (
        <div className="absolute top-0 right-8 w-20 h-80">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.1} />
                <PhysicsScene />
            </Canvas>
        </div>
    );
};

export default AdvancedLightBulb;