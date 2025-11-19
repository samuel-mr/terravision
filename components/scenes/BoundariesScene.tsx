import React from 'react';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';

// Define the shape of the lot (Trapezoid-ish on the ground)
// Points are relative to center (0,0,0)
const boundaryPoints = [
  new THREE.Vector3(-15, -5, -15),
  new THREE.Vector3(15, -5, -10),
  new THREE.Vector3(10, -5, 15),
  new THREE.Vector3(-10, -5, 12),
  new THREE.Vector3(-15, -5, -15), // Close the loop
];

export const BoundariesScene: React.FC = () => {
  return (
    <group>
      {/* The Boundary Line */}
      <Line
        points={boundaryPoints}
        color="#facc15" // Yellow color
        lineWidth={4}
        dashed={false}
      />

      {/* Stakes at the corners */}
      {boundaryPoints.slice(0, 4).map((point, idx) => (
        <mesh key={idx} position={point}>
          <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}

      {/* Area Label floating in the center of the lot */}
      <Html position={[0, -2, 0]} center>
        <div className="bg-yellow-500 text-black font-bold px-3 py-1 rounded shadow-lg border-2 border-white transform transition-transform hover:scale-110 cursor-default">
          LOTE A-24
          <div className="text-xs font-normal">450 m²</div>
        </div>
      </Html>

      {/* Side length labels (approximate midpoints) */}
      <Html position={[-12.5, -4, -1.5]} center><div className="text-white font-bold text-sm drop-shadow-md bg-black/50 px-1 rounded">27m</div></Html>
      <Html position={[12.5, -4, 2.5]} center><div className="text-white font-bold text-sm drop-shadow-md bg-black/50 px-1 rounded">25m</div></Html>
      
      {/* Surrounding "Sold" lots visualization */}
      <group position={[30, -5, 0]}>
         <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 30]} />
            <meshBasicMaterial color="red" opacity={0.3} transparent side={THREE.DoubleSide} />
         </mesh>
         <Html position={[0, 2, 0]} center>
            <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded opacity-80">VENDIDO</div>
         </Html>
      </group>
    </group>
  );
};
