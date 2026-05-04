import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoveUpRight, MoveDownRight, Pause } from 'lucide-react';

interface Minigame6Props {
  onComplete: (success: boolean) => void;
}

const WORDS = [
  { text: "Ascendere", translation: "Subir", correctShape: 'UP' },
  { text: "Morire", translation: "Morir / Descender", correctShape: 'DOWN' },
  { text: "Sospiro", translation: "Suspiro / Silencio", correctShape: 'REST' },
];

export default function Minigame6({ onComplete }: Minigame6Props) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [score, setScore] = useState(0);

  const handleShapeSelect = (shape: string) => {
    if (shape === WORDS[currentWordIdx].correctShape) {
      setScore(s => s + 1);
    }
    
    if (currentWordIdx < WORDS.length - 1) {
      setCurrentWordIdx(i => i + 1);
    } else {
      setTimeout(() => {
        onComplete(score + (shape === WORDS[currentWordIdx].correctShape ? 1 : 0) >= 2);
      }, 500);
    }
  };

  const currentWord = WORDS[currentWordIdx];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl w-full bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-parchment-400 text-center my-auto shrink-0"
    >
      <h2 className="text-3xl font-cinzel font-bold text-ink-800 mb-2 tracking-wider">El Salón del Madrigal</h2>
      <p className="text-lg font-baskerville text-ink-900 mb-8 opacity-80">
        Usa los madrigalismos (text-painting) para expresar el significado de la palabra mediante la música.
      </p>

      <div className="bg-white border-2 border-gold-500 rounded-sm p-8 mb-8 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 text-xs font-cinzel text-gold-500 uppercase font-bold">
          {currentWordIdx + 1} / {WORDS.length}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWordIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-5xl font-baskerville italic font-bold text-crimson-900 mb-2">"{currentWord.text}"</h3>
            <p className="text-sm font-cinzel tracking-widest text-ink-800 uppercase">Significado: {currentWord.translation}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <h4 className="font-cinzel text-ink-800 mb-4 font-bold uppercase tracking-widest">Elige la figura melódica</h4>
      
      <div className="flex gap-4 justify-center">
        <button 
          onClick={() => handleShapeSelect('UP')}
          className="w-24 h-24 bg-parchment-100 hover:bg-gold-500 hover:text-white border-2 border-ink-800 rounded-lg flex flex-col items-center justify-center transition-all text-ink-800 shadow-md transform hover:-translate-y-1"
        >
          <MoveUpRight className="w-10 h-10 mb-2" />
          <span className="text-xs font-bold uppercase">Ascenso</span>
        </button>
        <button 
          onClick={() => handleShapeSelect('DOWN')}
          className="w-24 h-24 bg-parchment-100 hover:bg-gold-500 hover:text-white border-2 border-ink-800 rounded-lg flex flex-col items-center justify-center transition-all text-ink-800 shadow-md transform hover:-translate-y-1"
        >
          <MoveDownRight className="w-10 h-10 mb-2" />
          <span className="text-xs font-bold uppercase">Descenso</span>
        </button>
        <button 
          onClick={() => handleShapeSelect('REST')}
          className="w-24 h-24 bg-parchment-100 hover:bg-gold-500 hover:text-white border-2 border-ink-800 rounded-lg flex flex-col items-center justify-center transition-all text-ink-800 shadow-md transform hover:-translate-y-1"
        >
          <Pause className="w-10 h-10 mb-2" />
          <span className="text-xs font-bold uppercase">Silencio</span>
        </button>
      </div>
    </motion.div>
  );
}
