import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { IconMapPin, IconHome, IconInfo, IconRuler } from '../Icons';
import { POI } from '../../types';

// Enhanced Data with specific types for iconography
interface RichPOI extends POI {
  type: 'nature' | 'commerce' | 'transport' | 'leisure';
  description: string;
  imageUrl: string; // In a real app, these would be specific thumbnail URLs
}

const richPois: RichPOI[] = [
  { 
    id: '1', label: 'Playa Hermosa', distance: '800m', position: [25, 5, -40], 
    type: 'nature', description: 'Aguas cristalinas y arena blanca.', 
    imageUrl: 'https://picsum.photos/id/10/200/120' 
  },
  { 
    id: '2', label: 'Eco Market', distance: '1.5km', position: [-30, 2, -20], 
    type: 'commerce', description: 'Productos orgánicos locales.', 
    imageUrl: 'https://picsum.photos/id/30/200/120' 
  },
  { 
    id: '3', label: 'Aeropuerto Int.', distance: '15km', position: [10, 12, 40], 
    type: 'transport', description: 'Conexión directa en 20 min.', 
    imageUrl: 'https://picsum.photos/id/4/200/120' 
  },
  { 
    id: '4', label: 'Club de Campo', distance: '3km', position: [-40, 6, 30], 
    type: 'leisure', description: 'Golf, tenis y piscina.', 
    imageUrl: 'https://picsum.photos/id/54/200/120' 
  },
];

// Helper to get color/icon based on type (Eco Palette)
const getCategoryStyles = (type: string) => {
  switch(type) {
    case 'nature': return { color: '#15803d', bg: 'bg-green-700', icon: <IconHome className="w-5 h-5" /> }; // Green
    case 'commerce': return { color: '#a8a29e', bg: 'bg-stone-500', icon: <IconInfo className="w-5 h-5" /> }; // Stone
    case 'transport': return { color: '#0ea5e9', bg: 'bg-sky-500', icon: <IconRuler className="w-5 h-5" /> }; // Sky
    case 'leisure': return { color: '#d97706', bg: 'bg-amber-600', icon: <IconMapPin className="w-5 h-5" /> }; // Amber
    default: return { color: '#44403c', bg: 'bg-stone-700', icon: <IconMapPin className="w-5 h-5" /> };
  }
};

const RichMarker: React.FC<{ poi: RichPOI }> = ({ poi }) => {
  const [expanded, setExpanded] = useState(false);
  const style = getCategoryStyles(poi.type);
  const groupRef = React.useRef<THREE.Group>(null);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = poi.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={poi.position}>
      {/* Connection line fading out */}
      <mesh position={[0, -poi.position[1]/2, 0]}>
         <cylinderGeometry args={[0.02, 0.02, poi.position[1], 4]} />
         <meshBasicMaterial color={style.color} opacity={0.4} transparent />
      </mesh>

      {/* Pulsing Dot */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color={style.color} />
      </mesh>
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color={style.color} opacity={0.3} transparent />
      </mesh>

      <Html center distanceFactor={20} zIndexRange={[100, 0]}>
        <div 
          className="relative flex flex-col items-center cursor-pointer transition-all duration-300"
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          onClick={() => setExpanded(!expanded)}
        >
            {/* Icon Circle */}
            <div className={`${style.bg} text-white p-3 rounded-full shadow-xl shadow-black/20 border-2 border-white transform transition-transform hover:scale-110`}>
              {style.icon}
            </div>

            {/* Info Card - Only shows on hover/click */}
            <div className={`
              absolute top-14 bg-white rounded-2xl shadow-2xl overflow-hidden min-w-[200px] transition-all duration-300 origin-top
              ${expanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
            `}>
              <div className="h-24 w-full overflow-hidden bg-gray-200">
                <img src={poi.imageUrl} alt={poi.label} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-stone-800 text-lg leading-tight">{poi.label}</h3>
                  <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${style.bg}`}>
                    {poi.distance}
                  </span>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed">{poi.description}</p>
                
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-2 text-stone-400 text-xs">
                   <span>🚗 5 min</span>
                   <span>•</span>
                   <span>🚴 12 min</span>
                </div>
              </div>
            </div>
        </div>
      </Html>
    </group>
  );
};

export const ProximityScene: React.FC = () => {
  return (
    <group>
      {richPois.map(poi => (
        <RichMarker key={poi.id} poi={poi} />
      ))}
    </group>
  );
};