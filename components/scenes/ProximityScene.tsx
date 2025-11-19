import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { IconMapPin } from '../Icons';
import { POI } from '../../types';

const pois: POI[] = [
  { id: '1', label: 'Playa Hermosa', distance: '800m', position: [25, 5, -40] },
  { id: '2', label: 'Centro Comercial', distance: '1.5km', position: [-30, 2, -20] },
  { id: '3', label: 'Aeropuerto', distance: '15km', position: [10, 8, 40] },
  { id: '4', label: 'Parque Nacional', distance: '3km', position: [-40, 4, 30] },
];

const Marker: React.FC<{ poi: POI }> = ({ poi }) => {
  return (
    <group position={poi.position}>
      {/* A vertical line pointing down to the "horizon" */}
      <mesh position={[0, -poi.position[1]/2, 0]}>
         <cylinderGeometry args={[0.05, 0.05, poi.position[1], 4]} />
         <meshBasicMaterial color="white" opacity={0.6} transparent />
      </mesh>
      
      {/* The pulsing circle at the target */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>

      {/* The Label */}
      <Html center distanceFactor={15} zIndexRange={[100, 0]}>
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg ring-4 ring-blue-600/30 mb-2 transition-transform group-hover:scale-110">
             <IconMapPin className="w-6 h-6" />
          </div>
          <div className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl text-center min-w-[120px] relative">
            <div className="font-bold text-sm">{poi.label}</div>
            <div className="text-xs text-blue-600 font-bold">{poi.distance}</div>
            {/* Arrow down */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
          </div>
        </div>
      </Html>
    </group>
  );
};

export const ProximityScene: React.FC = () => {
  return (
    <group>
      {pois.map(poi => (
        <Marker key={poi.id} poi={poi} />
      ))}
    </group>
  );
};