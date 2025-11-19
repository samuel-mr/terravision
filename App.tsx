import React, { useState } from 'react';
import { ViewType } from './types';
import { Viewer360 } from './components/Viewer360';
import { BoundariesScene } from './components/scenes/BoundariesScene';
import { ProximityScene } from './components/scenes/ProximityScene';
import { InteractiveScene } from './components/scenes/InteractiveScene';
import { VirtualStagingScene } from './components/scenes/VirtualStagingScene';
import { IconRuler, IconMapPin, IconInfo, Icon360, IconHome } from './components/Icons';

// Placeholder images. 
const IMG_BOUNDARIES = "https://picsum.photos/id/28/4000/2000"; 
const IMG_PROXIMITY = "https://picsum.photos/id/48/4000/2000"; 
const IMG_INTERACTIVE = "https://picsum.photos/id/56/4000/2000"; 
const IMG_STAGING = "https://picsum.photos/id/15/4000/2000"; 

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.LANDING);

  const renderView = () => {
    switch (currentView) {
      case ViewType.BOUNDARIES:
        return (
          <Viewer360
            imageUrl={IMG_BOUNDARIES}
            title="Delimitación Natural"
            description="Límites claros integrados con el entorno. Visualiza la extensión real de tu futuro hogar."
            features={['Perímetro 3D', 'Medición de lados', 'Área total', 'Lotes Vecinos']}
            onBack={() => setCurrentView(ViewType.LANDING)}
          >
            <BoundariesScene />
          </Viewer360>
        );
      case ViewType.PROXIMITY:
        return (
          <Viewer360
            imageUrl={IMG_PROXIMITY}
            title="Entorno y Vida"
            description="Conecta con lo que te rodea. Descubre la cercanía a la naturaleza y servicios esenciales."
            features={['Puntos de Interés', 'Tiempo de Viaje', 'Vista Previa', 'Ubicación']}
            onBack={() => setCurrentView(ViewType.LANDING)}
          >
            <ProximityScene />
          </Viewer360>
        );
      case ViewType.INTERACTIVE:
        return (
          <Viewer360
            imageUrl={IMG_INTERACTIVE}
            title="Tu Lote Ideal"
            description="Explora las opciones disponibles en nuestro masterplan ecológico y encuentra tu espacio."
            features={['Disponibilidad', 'Precios Transparentes', 'Metraje', 'Reserva']}
            onBack={() => setCurrentView(ViewType.LANDING)}
          >
            <InteractiveScene />
          </Viewer360>
        );
      case ViewType.VIRTUAL_STAGING:
        return (
          <Viewer360
            imageUrl={IMG_STAGING}
            title="Sueña tu Hogar"
            description="Visualiza la armonía de una construcción moderna integrada en este paisaje."
            features={['Proyección Arquitectónica', 'Volumetría', 'Escala Real', 'Integración']}
            onBack={() => setCurrentView(ViewType.LANDING)}
          >
            <VirtualStagingScene />
          </Viewer360>
        );
      default:
        return <LandingPage onSelect={(view) => setCurrentView(view)} />;
    }
  };

  return (
    <div className="w-full h-screen bg-[#F5F5F4]">
      {renderView()}
    </div>
  );
};

// Sub-component for the landing page selection (Eco-Modern Style)
const LandingPage = ({ onSelect }: { onSelect: (view: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F4] text-stone-800 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl mb-6 shadow-xl shadow-stone-200/50">
             <Icon360 className="w-10 h-10 text-green-700" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-stone-900">
            Terra<span className="text-green-700">Vision</span>
          </h1>
          <p className="text-stone-500 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Experiencia inmersiva para espacios vivos. <br/>
            Conecta con la naturaleza de tu próxima inversión.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Technical -> Boundaries */}
          <div 
            onClick={() => onSelect(ViewType.BOUNDARIES)}
            className="group bg-white rounded-[2rem] p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200 hover:-translate-y-2 border border-transparent hover:border-amber-100"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300">
                <IconRuler className="w-6 h-6 text-amber-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-bold tracking-wider text-amber-700 bg-amber-50 px-4 py-2 rounded-full">TÉCNICO</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-stone-800 group-hover:text-amber-700 transition-colors">Límites y Medidas</h3>
            <p className="text-stone-500 leading-relaxed">
              Visualización precisa del perímetro. Entiende el espacio real y sus dimensiones en armonía con la topografía.
            </p>
          </div>

          {/* Card 2: Location -> Proximity */}
          <div 
            onClick={() => onSelect(ViewType.PROXIMITY)}
            className="group bg-white rounded-[2rem] p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200 hover:-translate-y-2 border border-transparent hover:border-sky-100"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="bg-sky-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-sky-500 transition-all duration-300">
                <IconMapPin className="w-6 h-6 text-sky-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-bold tracking-wider text-sky-700 bg-sky-50 px-4 py-2 rounded-full">ENTORNO</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-stone-800 group-hover:text-sky-700 transition-colors">Puntos de Interés</h3>
            <p className="text-stone-500 leading-relaxed">
              Descubre la cercanía a playas, bosques y servicios. La ubicación perfecta para un estilo de vida conectado.
            </p>
          </div>

          {/* Card 3: Sales -> Interactive */}
          <div 
            onClick={() => onSelect(ViewType.INTERACTIVE)}
            className="group bg-white rounded-[2rem] p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200 hover:-translate-y-2 border border-transparent hover:border-green-100"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                <IconInfo className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-bold tracking-wider text-green-700 bg-green-50 px-4 py-2 rounded-full">DISPONIBILIDAD</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-stone-800 group-hover:text-green-700 transition-colors">Masterplan Vivo</h3>
            <p className="text-stone-500 leading-relaxed">
              Navega entre lotes disponibles. Información transparente de precios y estados en tiempo real.
            </p>
          </div>

          {/* Card 4: Arch -> Virtual Staging */}
          <div 
            onClick={() => onSelect(ViewType.VIRTUAL_STAGING)}
            className="group bg-white rounded-[2rem] p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200 hover:-translate-y-2 border border-transparent hover:border-stone-200"
          >
             <div className="flex items-start justify-between mb-6">
              <div className="bg-stone-100 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-stone-600 transition-all duration-300">
                <IconHome className="w-6 h-6 text-stone-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-bold tracking-wider text-stone-600 bg-stone-100 px-4 py-2 rounded-full">PROYECCIÓN</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-stone-800 group-hover:text-stone-600 transition-colors">Construcción Virtual</h3>
            <p className="text-stone-500 leading-relaxed">
              Imagina el futuro. Proyecta modelos arquitectónicos sobre el terreno para visualizar el potencial de tu inversión.
            </p>
          </div>

        </div>

        <div className="mt-20 text-center flex flex-col items-center">
           <p className="text-stone-400 text-sm font-medium tracking-widest mb-4">POWERED BY WEBGL</p>
           <div className="w-16 h-1 bg-gradient-to-r from-transparent via-stone-300 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default App;