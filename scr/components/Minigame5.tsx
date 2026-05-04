import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Minigame5Props {
  onComplete: (success: boolean) => void;
}

const MASS_PARTS = ['Kyrie', 'Gloria', 'Credo', 'Sanctus', 'Agnus Dei'];

export default function Minigame5({ onComplete }: Minigame5Props) {
  const [currentPart, setCurrentPart] = useState(0);
  const [score, setScore] = useState(0);

  const OPTIONS = [
    { text: "Línea de Cantus Firmus", correct: true },
    { text: "Ritmo de Danza Profana", correct: false },
    { text: "Acordes Disonantes", correct: false },
  ];

  // Shuffle options slightly to not always have correct first, but simple is fine for now
  const handleSelect = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(s => s + 1);
    }
    
    if (currentPart < MASS_PARTS.length - 1) {
      setCurrentPart(p => p + 1);
    } else {
      setTimeout(() => {
        onComplete(score + (isCorrect ? 1 : 0) >= 3); // pass if 3/5
      }, 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl w-full bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-parchment-400 my-auto shrink-0 flex flex-col items-center"
    >
      <h2 className="text-3xl font-cinzel font-bold text-ink-800 mb-2 tracking-wider">Arquitectos de la Misa</h2>
      <p className="text-lg font-baskerville text-ink-900 mb-8 opacity-80 text-center">
        Construye el Ordinario. Añade el bloque constructivo correcto (Cantus Firmus) a cada movimiento para dotarlo de unidad.
      </p>

      <div className="w-full flex justify-between mb-8">
        {MASS_PARTS.map((part, index) => (
          <div key={part} className="flex flex-col items-center">
            <div className={`w-16 h-20 border-2 flex items-end justify-center rounded-sm mb-2 transition-all
              ${index < currentPart ? 'bg-gold-500 border-ink-800 shadow-md' : index === currentPart ? 'bg-white border-crimson-900 border-dashed animate-pulse' : 'bg-parchment-200 border-parchment-400 opacity-50'}
            `}>
              {index < currentPart && <div className="w-full h-1/3 bg-ink-800/10 border-t border-ink-800/20" />}
            </div>
            <span className={`text-xs uppercase tracking-widest font-bold ${index === currentPart ? 'text-crimson-900' : 'text-ink-800'}`}>
              {part}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPart}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="w-full bg-white p-6 rounded-sm border border-parchment-400 shadow-sm"
        >
          <h3 className="font-cinzel text-xl font-bold text-ink-900 mb-4 text-center">Pieza actual: {MASS_PARTS[currentPart]}</h3>
          <p className="font-baskerville italic text-center mb-6 text-ink-800">¿Qué bloque insertarás en el Tenor?</p>
          
          <div className="flex flex-col gap-3">
            {/* Normally we'd shuffle these, but let's keep it static for simplicity and use distinct buttons */}
            {[
              { text: "Cantus Firmus (Canto Llano)", correct: true },
              { text: "Melodía de Danza Libre", correct: false },
              { text: "Secuencia Disonante al Azar", correct: false },
            ].sort(() => Math.random() - 0.5).map((opt, i) => (
               <button
                 key={i}
                 onClick={() => handleSelect(opt.correct)}
                 className="p-4 border-2 border-parchment-400 hover:border-gold-500 bg-parchment-100 hover:bg-white text-ink-900 font-cinzel font-bold tracking-wider rounded-sm transition-all"
               >
                 + {opt.text}
               </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

    </motion.div>
  );
}
