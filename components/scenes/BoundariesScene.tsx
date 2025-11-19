import React from 'react';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';

const boundaryPoints = [
  new THREE.Vector3(-15, -5, -15),
  new THREE.Vector3(15, -5, -10),
  new THREE.Vector3(10, -5, 15),
  new THREE.Vector3(-10, -5, 12),
  new THREE.Vector3(-15, -5, -15),
];

export const BoundariesScene: React.FC = () => {
  return (
    <group>
      {/* Boundary Line - Warm Amber */}
      <Line
        points={boundaryPoints}
        color="#d97706" 
        lineWidth={4}
        dashed={false}
      />

      {/* Stakes - Wood/White style */}
      {boundaryPoints.slice(0, 4).map((point, idx) => (
        <mesh key={idx} position={point}>
          <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
          <meshStandardMaterial color="#f5f5f4" />
        </mesh>
      ))}

      {/* Area Label */}
      <Html position={[0, -2, 0]} center>
        <div className="bg-stone-800/90 text-white backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border border-amber-500/50 flex flex-col items-center">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Lote Disponible</span>
          <span className="text-2xl font-bold">LOTE A-24</span>
          <span className="text-sm text-stone-300 font-normal">450.00 m²</span>
        </div>
      </Html>

      {/* Measurements */}
      <Html position={[-12.5, -4, -1.5]} center>
        <div className="text-stone-800 font-bold text-sm shadow-sm bg-white/90 px-2 py-1 rounded-md border border-stone-200">27m</div>
      </Html>
      <Html position={[12.5, -4, 2.5]} center>
        <div className="text-stone-800 font-bold text-sm shadow-sm bg-white/90 px-2 py-1 rounded-md border border-stone-200">25m</div>
      </Html>
      
      {/* Sold Neighbor */}
      <group position={[30, -5, 0]}>
         <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 30]} />
            <meshBasicMaterial color="#78716c" opacity={0.3} transparent side={THREE.DoubleSide} />
         </mesh>
         <Html position={[0, 2, 0]} center>
            <div className="bg-stone-600 text-white text-xs font-bold px-3 py-1 rounded-full opacity-90 tracking-wider">VENDIDO</div>
         </Html>
      </group>
    </group>
  );
};