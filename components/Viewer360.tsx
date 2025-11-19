import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload, Html } from '@react-three/drei';
import * as THREE from 'three';
import { UIOverlay } from './UIOverlay';

// Helper component to load the 360 texture
const SceneBackground = ({ imageUrl }: { imageUrl: string }) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  // Configuración para mejorar calidad visual
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

// Professional Loader Component (Simplified without percentage)
const LoadingScreen = () => {
  return (
    <Html center zIndexRange={[1000, 1000]}>
      <div className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl min-w-[280px]">
        {/* Animated Spinner */}
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute w-full h-full rounded-full border-4 border-gray-700"></div>
          <div className="absolute w-full h-full rounded-full border-4 border-t-blue-500 animate-spin"></div>
          {/* Inner pulsing dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-white font-bold text-xl tracking-widest mb-2 text-center">CARGANDO</h2>
        <p className="text-gray-400 text-xs uppercase tracking-wider animate-pulse text-center">Preparando experiencia inmersiva...</p>
      </div>
    </Html>
  );
};

interface Viewer360Props {
  imageUrl: string;
  title: string;
  description: string;
  features: string[];
  onBack: () => void;
  children: React.ReactNode;
}

export const Viewer360: React.FC<Viewer360Props> = ({ 
  imageUrl, 
  title, 
  description, 
  features, 
  onBack, 
  children 
}) => {
  return (
    <div className="relative w-full h-full bg-gray-900">
      {/* 2D Overlay */}
      <UIOverlay 
        title={title} 
        description={description} 
        onBack={onBack}
        features={features}
      />

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        {/* Suspense handles the async loading of textures */}
        <Suspense fallback={<LoadingScreen />}>
          <SceneBackground imageUrl={imageUrl} />
          <ambientLight intensity={0.6} />
          
          {/* Render the specific scene content */}
          {children}

          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            enableDamping 
            dampingFactor={0.05} 
            rotateSpeed={-0.5} 
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};