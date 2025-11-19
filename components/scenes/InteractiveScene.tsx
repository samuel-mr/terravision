import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { LotInfo } from '../../types';

const lots: LotInfo[] = [
  { id: 'L-101', price: '$45,000', size: '300m²', status: 'available', position: [-15, -5, -15] },
  { id: 'L-102', price: '$52,000', size: '350m²', status: 'available', position: [0, -5, -20] },
  { id: 'L-103', price: '$0', size: '400m²', status: 'sold', position: [15, -5, -15] },
];

export const InteractiveScene: React.FC = () => {
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  return (
    <group>
      {lots.map((lot) => (
        <group key={lot.id} position={lot.position}>
          {/* Floating Info Card */}
          <Html position={[0, 2, 0]} center zIndexRange={[100, 0]}>
            <div 
              className={`
                transition-all duration-300 cursor-pointer
                ${selectedLot === lot.id ? 'scale-110 z-50' : 'scale-100 hover:scale-105'}
              `}
              onClick={() => setSelectedLot(selectedLot === lot.id ? null : lot.id)}
            >
              <div className={`
                rounded-xl shadow-2xl overflow-hidden w-48 border-2
                ${lot.status === 'sold' ? 'bg-gray-100 border-gray-400 opacity-80' : 'bg-white border-green-500'}
              `}>
                <div className={`
                  py-2 px-3 text-center font-bold text-white text-sm uppercase
                  ${lot.status === 'sold' ? 'bg-gray-500' : 'bg-green-600'}
                `}>
                  {lot.status === 'sold' ? 'Vendido' : 'Disponible'}
                </div>
                
                <div className="p-3 text-center">
                   <h3 className="text-lg font-bold text-gray-800">{lot.id}</h3>
                   <p className="text-gray-500 text-xs mb-2">{lot.size}</p>
                   
                   {lot.status !== 'sold' && (
                     <div className="text-green-700 font-bold text-lg border-t border-gray-100 pt-2">
                       {lot.price}
                     </div>
                   )}
                   
                   {selectedLot === lot.id && lot.status !== 'sold' && (
                     <button className="mt-2 w-full bg-green-600 text-white text-xs py-1.5 rounded hover:bg-green-700 transition-colors">
                       Cotizar Ahora
                     </button>
                   )}
                </div>
              </div>
              
              {/* Connection line */}
              <div className="w-0.5 h-8 bg-white/50 mx-auto"></div>
              <div className="w-3 h-3 bg-white rounded-full mx-auto shadow-lg"></div>
            </div>
          </Html>
          
          {/* Ground marker */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1, 1.2, 32]} />
            <meshBasicMaterial color={lot.status === 'sold' ? 'gray' : '#22c55e'} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1, 32]} />
            <meshBasicMaterial color={lot.status === 'sold' ? 'gray' : '#22c55e'} opacity={0.2} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
};
