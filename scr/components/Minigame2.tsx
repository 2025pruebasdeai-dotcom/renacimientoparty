import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Minigame2Props {
  onComplete: (success: boolean) => void;
}

const DOORS = [
  { mode: 'Dórico', correctKey: 'Re', description: 'Serio, solemne' },
  { mode: 'Frigio', correctKey: 'Mi', description: 'Vehemente, intenso' },
  { mode: 'Lidio', correctKey: 'Fa', description: 'Alegre, luminoso' },
  { mode: 'Mixolidio', correctKey: 'Sol', description: 'Dulce, moderado' },
  { mode: 'Eólico', correctKey: 'La', description: 'Melancólico y triste' },
];

const KEYS = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

export default function Minigame2({ onComplete }: Minigame2Props) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [isWrong, setIsWrong] = useState(false);

  const handleKeySelect = (keyName: string) => {
    if (keyName === DOORS[currentLevel].correctKey) {
      setScore(s => s + 1);
      advance();
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
        advance();
      }, 1000);
    }
  };

  const advance = () => {
    if (currentLevel < DOORS.length - 1) {
      setCurrentLevel(l => l + 1);
    } else {
      setTimeout(() => {
        onComplete(score + (isWrong ? 0 : 1) >= 4); // Need 4 out of 5 to pass
      }, 500);
    }
  };

  const currentDoor = DOORS[currentLevel];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl w-full bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-parchment-400 text-center my-auto shrink-0"
    >
      <h2 className="text-3xl font-cinzel font-bold text-ink-800 mb-2 tracking-wider">El Laberinto de los Modos</h2>
      <p className="text-lg font-baskerville text-ink-900 mb-6 opacity-80">
        Encuentra la llave con la <span className="font-bold">Finalis</span> correcta para abrir la puerta de cada modo eclesiástico.
      </p>

      <div className="flex flex-col items-center">
        <div className="mb-4 text-sm font-cinzel font-bold text-gold-500 uppercase tracking-widest">
          Puerta {currentLevel + 1} de {DOORS.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, x: isWrong ? [0, -10, 10, -10, 10, 0] : 0 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className={`w-48 h-64 border-4 rounded-t-full flex flex-col items-center justify-center shadow-lg relative mb-8
              ${isWrong ? 'border-crimson-900 bg-red-50' : 'border-ink-800 bg-parchment-200'}`}
          >
            <div className="absolute inset-2 border-2 border-ink-800/30 rounded-t-full" />
            <h3 className="text-2xl font-cinzel font-bold text-ink-900 mb-2">{currentDoor.mode}</h3>
            <p className="text-sm font-baskerville italic text-ink-800 text-center px-4">"{currentDoor.description}"</p>
            <div className="w-8 h-8 rounded-full bg-ink-900 mt-6 shadow-inner absolute bottom-8 border-2 border-gold-500" />
            <div className="w-2 h-6 bg-ink-900 absolute bottom-3" />
          </motion.div>
        </AnimatePresence>

        <h4 className="font-cinzel text-ink-800 mb-4 font-bold uppercase tracking-widest">Elige tu Llave</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {KEYS.map(keyName => (
            <button
              key={keyName}
              onClick={() => handleKeySelect(keyName)}
              className="w-16 h-16 rounded-full border-2 border-gold-500 bg-white text-ink-900 font-cinzel font-bold text-xl hover:bg-gold-500 hover:text-white transition-all shadow-md flex items-center justify-center transform hover:-translate-y-1"
            >
              {keyName}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
