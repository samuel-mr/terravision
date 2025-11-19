import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { IconHome } from '../Icons';

export const VirtualStagingScene: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <group>
      {/* 
        MODELO DE LA CASA 
        Usamos meshBasicMaterial con wireframe para asegurar que SIEMPRE se vea
        sin importar la iluminación.
      */}
      {isVisible && (
        <group position={[0, -3, -10]}> {/* Posición: Al frente y un poco abajo */}
            
            {/* Estructura (Cubo) */}
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[5, 3, 4]} />
              <meshBasicMaterial color="#3b82f6" wireframe />
            </mesh>
            {/* Relleno transparente para dar cuerpo */}
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[4.9, 2.9, 3.9]} />
              <meshBasicMaterial color="#3b82f6" opacity={0.2} transparent />
            </mesh>

            {/* Techo (Cono/Pirámide) */}
            <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[4, 3, 4]} />
              <meshBasicMaterial color="#60a5fa" wireframe />
            </mesh>

            {/* Etiqueta simple flotante */}
            <Html position={[0, 6, 0]} center>
                <div className="bg-blue-600/90 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg backdrop-blur-sm">
                    Proyecto Futuro
                </div>
            </Html>
        </group>
      )}

      {/* 
        BOTÓN DE INTERFAZ (HUD)
        Simplificado y fijo en la pantalla
      */}
      <Html fullscreen style={{ pointerEvents: 'none' }} zIndexRange={[100, 0]}>
         <div className="w-full h-full relative flex flex-col justify-end items-center pb-20">
            <div className="pointer-events-auto">
              <button
                onClick={() => setIsVisible(!isVisible)}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl font-bold transition-all transform hover:scale-105 border-2
                  ${isVisible 
                    ? 'bg-white text-red-600 border-red-100 hover:bg-gray-100' 
                    : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-700'}
                `}
              >
                <IconHome className="w-5 h-5" />
                <span>{isVisible ? 'Ocultar Proyecto' : 'Proyectar Construcción'}</span>
              </button>
            </div>
            
            {!isVisible && (
                <p className="text-white/80 text-xs mt-2 bg-black/50 px-2 py-1 rounded pointer-events-auto">
                    Click para visualizar
                </p>
            )}
         </div>
      </Html>
    </group>
  );
};