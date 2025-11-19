import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload, Html } from '@react-three/drei';
import * as THREE from 'three';
import { UIOverlay } from './UIOverlay';

// Helper component to load the 360 texture
const SceneBackground = ({ imageUrl }: { imageUrl: string }) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

// Eco-Modern Loading Screen
const LoadingScreen = () => {
  return (
    <Html center zIndexRange={[1000, 1000]}>
      <div className="flex flex-col items-center justify-center bg-[#F5F5F4] p-10 rounded-[2rem] shadow-2xl min-w-[300px]">
        {/* Organic Spinner */}
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute w-full h-full rounded-full border-[3px] border-stone-200"></div>
          <div className="absolute w-full h-full rounded-full border-[3px] border-t-green-600 animate-spin"></div>
        </div>
        
        <h2 className="text-stone-800 font-bold text-xl tracking-tight mb-2 text-center">Cargando Vista</h2>
        <p className="text-stone-500 text-sm font-medium animate-pulse text-center">Preparando el entorno natural...</p>
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
    <div className="relative w-full h-full bg-stone-900">
      {/* 2D Overlay */}
      <UIOverlay 
        title={title} 
        description={description} 
        onBack={onBack}
        features={features}
      />

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={<LoadingScreen />}>
          <SceneBackground imageUrl={imageUrl} />
          <ambientLight intensity={0.6} />
          
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