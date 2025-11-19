import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { IconHome } from '../Icons';

export const VirtualStagingScene: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <group>
      {/* MODELO 3D - Ghost House (White wireframe looks better for Eco/Clean style) */}
      {isVisible && (
        <group position={[0, -3, -10]}>
            
            {/* Structure */}
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[5, 3, 4]} />
              <meshBasicMaterial color="white" wireframe />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[4.9, 2.9, 3.9]} />
              <meshBasicMaterial color="white" opacity={0.1} transparent />
            </mesh>

            {/* Roof */}
            <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[4, 3, 4]} />
              <meshBasicMaterial color="white" wireframe />
            </mesh>

            {/* Label */}
            <Html position={[0, 6, 0]} center>
                <div className="bg-white/90 text-stone-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-white">
                    Casa Modelo "Roble"
                </div>
            </Html>
        </group>
      )}

      {/* UI HUD - Fixed Position */}
      <Html fullscreen style={{ pointerEvents: 'none' }} zIndexRange={[100, 0]}>
         <div className="w-full h-full relative flex flex-col justify-end items-center pb-24">
            <div className="pointer-events-auto">
              <button
                onClick={() => setIsVisible(!isVisible)}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-full shadow-2xl font-bold transition-all transform hover:scale-105 border-2
                  ${isVisible 
                    ? 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50' 
                    : 'bg-green-700 text-white border-green-600 hover:bg-green-800'}
                `}
              >
                <IconHome className="w-5 h-5" />
                <span>{isVisible ? 'Ocultar Propuesta' : 'Ver Construcción Virtual'}</span>
              </button>
            </div>
            
            {!isVisible && (
                <p className="text-white text-xs font-medium mt-3 bg-stone-900/40 px-3 py-1.5 rounded-full pointer-events-auto backdrop-blur-sm">
                    Haz clic para proyectar el modelo
                </p>
            )}
         </div>
      </Html>
    </group>
  );
};