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
          
          {/* Info Card - Eco Style */}
          <Html position={[0, 2, 0]} center zIndexRange={[100, 0]}>
            <div 
              className={`
                transition-all duration-500 cursor-pointer
                ${selectedLot === lot.id ? 'scale-110 z-50' : 'scale-100 hover:scale-105'}
              `}
              onClick={() => setSelectedLot(selectedLot === lot.id ? null : lot.id)}
            >
              <div className={`
                rounded-[1.5rem] shadow-2xl overflow-hidden w-52 border border-stone-100
                ${lot.status === 'sold' ? 'bg-stone-100 opacity-90 grayscale' : 'bg-white'}
              `}>
                <div className={`
                  py-2 px-4 text-center font-bold text-white text-xs uppercase tracking-widest
                  ${lot.status === 'sold' ? 'bg-stone-400' : 'bg-green-700'}
                `}>
                  {lot.status === 'sold' ? 'No Disponible' : 'Disponible'}
                </div>
                
                <div className="p-5 text-center">
                   <h3 className="text-2xl font-bold text-stone-800 mb-1">{lot.id}</h3>
                   <p className="text-stone-400 text-sm font-medium mb-4">{lot.size}</p>
                   
                   {lot.status !== 'sold' && (
                     <div className="text-green-700 font-bold text-xl border-t border-stone-100 pt-3">
                       {lot.price}
                     </div>
                   )}
                   
                   {selectedLot === lot.id && lot.status !== 'sold' && (
                     <button className="mt-4 w-full bg-stone-800 text-white text-xs font-bold py-2 rounded-full hover:bg-stone-700 transition-colors">
                       INICIAR COMPRA
                     </button>
                   )}
                </div>
              </div>
              
              {/* Connection line */}
              <div className="w-px h-12 bg-white/80 mx-auto"></div>
              <div className="w-3 h-3 bg-white rounded-full mx-auto shadow-lg"></div>
            </div>
          </Html>
          
          {/* Ground marker */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1, 1.1, 32]} />
            <meshBasicMaterial color={lot.status === 'sold' ? '#a8a29e' : '#15803d'} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1, 32]} />
            <meshBasicMaterial color={lot.status === 'sold' ? '#a8a29e' : '#15803d'} opacity={0.2} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
};