import React, { useState } from 'react';
import { ViewType } from './types';
import { Viewer360 } from './components/Viewer360';
import { BoundariesScene } from './components/scenes/BoundariesScene';
import { ProximityScene } from './components/scenes/ProximityScene';
import { InteractiveScene } from './components/scenes/InteractiveScene';
import { VirtualStagingScene } from './components/scenes/VirtualStagingScene';
import { IconRuler, IconMapPin, IconInfo, Icon360, IconHome } from './components/Icons';

// Placeholder images. In production, use real Equirectangular panoramas.
// These URLs are random high-res nature images, they will distort at poles but work for demo logic.
const IMG_BOUNDARIES = "https://picsum.photos/id/28/4000/2000"; // Forest/Field
const IMG_PROXIMITY = "https://picsum.photos/id/48/4000/2000"; // Open landscape
const IMG_INTERACTIVE = "https://picsum.photos/id/56/4000/2000"; // Fields
const IMG_STAGING = "https://picsum.photos/id/15/4000/2000"; // Waterfall/Rocks (Needs flat ground ideally, but works for demo)

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.LANDING);

  const renderView = () => {
    switch (currentView) {
      case ViewType.BOUNDARIES:
        return (
          <Viewer360
            imageUrl={IMG_BOUNDARIES}
            title="Delimitación de Terreno"
            description="Visualización exacta de los límites del lote con medidas y coordenadas. Ideal para mostrar la geometría real."
            features={['Perímetro 3D', 'Medición de lados', 'Área total', 'Vecinos vendidos']}
            onBack={() => setCurrentView(ViewType.LANDING)}
          >
            <BoundariesScene />
          </Viewer360>
        );
      case ViewType.PROXIMITY:
        return (
          <Viewer360
            imageUrl={IMG_PROXIMITY}
            title="Puntos de Interés"
            description="Muestra la ubicación relativa de lugares importantes desde el punto de vista del terreno."
            features={['Marcadores Flotantes', 'Distancias Reales', 'Iconografía', 'Radar de Ubicación']}
            onBack={() => setCurrentView(ViewType.LANDING)}
          >
            <ProximityScene />
          </Viewer360>
        );
      case ViewType.INTERACTIVE:
        return (
          <Viewer360
            imageUrl={IMG_INTERACTIVE}
            title="Venta Interactiva"
            description="Experiencia de ventas completa dentro de la vista 360. El usuario puede ver precios y estado."
            features={['Tarjetas Informativas', 'Estado Vendido/Libre', 'Precios', 'Call to Action']}
            onBack={() => setCurrentView(ViewType.LANDING)}
          >
            <InteractiveScene />
          </Viewer360>
        );
      case ViewType.VIRTUAL_STAGING:
        return (
          <Viewer360
            imageUrl={IMG_STAGING}
            title="Construcción Virtual"
            description="Ayuda al cliente a visualizar el potencial proyectando modelos arquitectónicos 3D sobre el terreno vacío."
            features={['Modelo 3D Holográfico', 'Switch On/Off', 'Volumetría', 'Contexto de Escala']}
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
    <div className="w-full h-screen bg-gray-900">
      {renderView()}
    </div>
  );
};

// Sub-component for the landing page selection
const LandingPage = ({ onSelect }: { onSelect: (view: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-full mb-4 shadow-lg shadow-blue-500/30">
             <Icon360 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Terra<span className="text-blue-500">Vision</span> 360
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Plataforma de demostración para visualización inmobiliaria inmersiva. 
            Selecciona una experiencia técnica para explorar sus capacidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div 
            onClick={() => onSelect(ViewType.BOUNDARIES)}
            className="group bg-gray-800/50 border border-gray-700 hover:border-yellow-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                <IconRuler className="text-yellow-500 group-hover:text-white" />
              </div>
              <span className="text-xs font-mono text-gray-500 border border-gray-700 rounded px-2 py-1">TÉCNICO</span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Límites y Medidas</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dibuja líneas vectoriales 3D sobre el terreno para mostrar exactamente qué está comprando el cliente. Incluye estacas virtuales y etiquetas de metros cuadrados.
            </p>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onSelect(ViewType.PROXIMITY)}
            className="group bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <IconMapPin className="text-blue-500 group-hover:text-white" />
              </div>
              <span className="text-xs font-mono text-gray-500 border border-gray-700 rounded px-2 py-1">UBICACIÓN</span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Contexto y Cercanía</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Indica dónde están la playa, el centro o las escuelas. Usa marcadores flotantes que siempre miran al usuario para resaltar la plusvalía de la ubicación.
            </p>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onSelect(ViewType.INTERACTIVE)}
            className="group bg-gray-800/50 border border-gray-700 hover:border-green-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                <IconInfo className="text-green-500 group-hover:text-white" />
              </div>
              <span className="text-xs font-mono text-gray-500 border border-gray-700 rounded px-2 py-1">VENTAS</span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">Masterplan Interactivo</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Convierte la visita en una venta. Muestra múltiples lotes, su estado (vendido/disponible), precio y permite abrir fichas de información sin salir del 360.
            </p>
          </div>

          {/* Card 4 (New) */}
          <div 
            onClick={() => onSelect(ViewType.VIRTUAL_STAGING)}
            className="group bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-2"
          >
             <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                <IconHome className="text-purple-500 group-hover:text-white" />
              </div>
              <span className="text-xs font-mono text-gray-500 border border-gray-700 rounded px-2 py-1">ARQUITECTURA</span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Construcción Virtual</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Proyecta modelos 3D "fantasmas" sobre terrenos baldíos. Permite al cliente visualizar la volumetría de su futura casa con un solo clic.
            </p>
          </div>

        </div>

        <div className="mt-16 text-center border-t border-gray-800 pt-8 flex flex-col items-center">
           <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">Desarrollado con tecnología WebGL</p>
           <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;