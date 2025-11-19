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
      {/* Header with Eco-Modern Gradient */}
      <div className="p-8 bg-gradient-to-b from-stone-900/90 via-stone-900/40 to-transparent pointer-events-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-stone-100 hover:text-white transition-all mb-6 bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/20 border border-white/10"
        >
          <IconArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium tracking-wide">Volver al Menú</span>
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-sm tracking-tight">{title}</h1>
        <p className="text-stone-200 max-w-lg mt-3 text-lg leading-relaxed font-light drop-shadow-sm">{description}</p>
      </div>

      {/* Feature Chips - Clean & Rounded */}
      <div className="p-8 pb-12 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent pointer-events-auto">
        <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-white/40"></div>
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Explora</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-stone-800/60 backdrop-blur-md border border-white/10 text-stone-100 px-5 py-2.5 rounded-full text-sm font-medium shadow-lg">
              {feat}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};