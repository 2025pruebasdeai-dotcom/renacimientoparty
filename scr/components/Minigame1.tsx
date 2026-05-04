import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

interface Minigame1Props {
  onComplete: (success: boolean) => void;
}

export default function Minigame1({ onComplete }: Minigame1Props) {
  const [layersStopped, setLayersStopped] = useState([false, false, false]);
  const [offsets, setOffsets] = useState([0, 0, 0]); // Distance from center
  const [gameEnded, setGameEnded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  // We'll use CSS animations for continuous back and forth movement
  // When stopped, we calculate the offset from the center of the container
  
  const handleStopLayer = (index: number) => {
    if (layersStopped[index] || gameEnded) return;
    
    // Stop the layer
    const newStopped = [...layersStopped];
    newStopped[index] = true;
    setLayersStopped(newStopped);

    // Calculate offset
    const containerRect = containerRef.current?.getBoundingClientRect();
    const layerRect = layerRefs[index].current?.getBoundingClientRect();
    
    if (containerRect && layerRect) {
      const containerCenter = containerRect.left + containerRect.width / 2;
      const layerCenter = layerRect.left + layerRect.width / 2;
      const offset = Math.abs(containerCenter - layerCenter);
      
      const newOffsets = [...offsets];
      newOffsets[index] = offset;
      setOffsets(newOffsets);
    }
  };

  useEffect(() => {
    if (layersStopped.every(s => s === true) && !gameEnded) {
      setGameEnded(true);
      // Check if all are within an acceptable range (e.g., 20px)
      const success = offsets.every(o => o <= 30);
      setTimeout(() => {
        onComplete(success);
      }, 2000);
    }
  }, [layersStopped, offsets, gameEnded, onComplete]);

  const layerTypes = [
    { name: 'Pentagrama', color: 'border-ink-800 border-y-4 h-12 text-ink-900 bg-transparent', speed: '2s' },
    { name: 'Notas', color: 'bg-ink-800 h-6 rounded-sm w-24 text-parchment-100', speed: '1.5s' },
    { name: 'Texto', color: 'bg-gold-500 h-4 rounded-sm w-32 text-ink-900', speed: '1s' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl w-full bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-parchment-400 text-center my-auto shrink-0"
    >
      <h2 className="text-3xl font-cinzel font-bold text-ink-800 mb-4 tracking-wider">La Imprenta de Petrucci</h2>
      <p className="text-lg font-baskerville text-ink-900 mb-8 opacity-80">
        La revolución de Ottaviano Petrucci requiere triple impresión. Detén cada capa exactamente en el centro para lograr una impresión perfecta.
      </p>

      <div ref={containerRef} className="relative w-full h-64 bg-white/50 border border-parchment-400 rounded-sm mb-8 overflow-hidden flex flex-col justify-between py-4 shadow-inner">
        {/* Center Guide line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 -ml-[0.5px] border-l-2 border-dashed border-gold-500 z-0" />
        
        {layerTypes.map((layer, idx) => (
          <div key={idx} className="relative w-full h-16 flex items-center z-10">
            <div
              ref={layerRefs[idx]}
              className={`absolute left-0 w-3/4 flex items-center justify-center
                ${!layersStopped[idx] ? 'animate-slide' : ''}`}
              style={{ animationDuration: layer.speed, animationPlayState: layersStopped[idx] ? 'paused' : 'running' }}
            >
               <div className={`w-3/4 ${layer.color} flex items-center justify-center text-parchment-100 font-cinzel text-xs font-bold shadow-md`}>
                 {layer.name}
               </div>
            </div>
          </div>
        ))}
        
        <style>{`
          @keyframes slide {
            0%, 100% { transform: translateX(-20%); }
            50% { transform: translateX(50%); }
          }
          .animate-slide {
             animation-name: slide;
             animation-iteration-count: infinite;
             animation-timing-function: ease-in-out;
          }
        `}</style>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
        {layerTypes.map((layer, idx) => (
          <button
            key={idx}
            onClick={() => handleStopLayer(idx)}
            disabled={layersStopped[idx]}
            className={`font-cinzel font-bold py-2 px-4 rounded-sm border transition-colors shadow-sm uppercase tracking-wider text-sm
              ${layersStopped[idx] ? 'bg-parchment-300 text-ink-800 border-parchment-400 cursor-not-allowed opacity-60' : 'bg-ink-800 text-parchment-100 border-ink-800 hover:bg-ink-900'}
            `}
          >
            Fijar {layer.name}
          </button>
        ))}
      </div>

      {gameEnded && (
        <div className="mt-6 text-xl font-cinzel font-bold text-crimson-900 animate-pulse">
          {offsets.every(o => o <= 30) ? '¡Impresión Perfecta!' : 'Las planchas se han movido...'}
        </div>
      )}
    </motion.div>
  );
}
