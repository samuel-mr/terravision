import React from 'react';
import { IconArrowLeft } from './Icons';

interface UIOverlayProps {
  title: string;
  description: string;
  onBack: () => void;
  features: string[];
}

export const UIOverlay: React.FC<UIOverlayProps> = ({ title, description, onBack, features }) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10">
      {/* Header */}
      <div className="p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md hover:bg-white/20"
        >
          <IconArrowLeft className="w-5 h-5" />
          <span>Volver al Menú</span>
        </button>
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">{title}</h1>
        <p className="text-gray-200 max-w-md mt-2 drop-shadow-md">{description}</p>
      </div>

      {/* Feature Chips */}
      <div className="p-6 pb-10 bg-gradient-to-t from-black/90 to-transparent pointer-events-auto">
        <div className="mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Características Demo Activas</div>
        <div className="flex flex-wrap gap-3">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
              {feat}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * Arrastra para girar. Usa la rueda del mouse para zoom.
        </p>
      </div>
    </div>
  );
};
