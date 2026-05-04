import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ear } from 'lucide-react';

interface Minigame7Props {
  onComplete: (success: boolean) => void;
}

const INSTRUMENTS = [
  {
    desc: "Un sonido melancólico proveniente de cuerdas frotadas por un arco. El músico sostiene el instrumento entre las piernas.",
    answer: "Viola da Gamba",
    options: ["Laúd", "Viola da Gamba", "Chirimía"]
  },
  {
    desc: "Un sonido metálico y potente, de un instrumento de viento con una vara deslizante.",
    answer: "Sacabuche",
    options: ["Trompeta natural", "Sacabuche", "Cornetto"]
  },
  {
    desc: "Cuerdas pulsadas delicadamente en un instrumento con cuerpo en forma de media pera.",
    answer: "Laúd",
    options: ["Vihuela", "Laúd", "Clavicordio"]
  }
];

export default function Minigame7({ onComplete }: Minigame7Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  const handleSelect = (option: string) => {
    const isCorrect = option === INSTRUMENTS[currentIdx].answer;
    if (isCorrect) setScore(s => s + 1);

    if (currentIdx < INSTRUMENTS.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setTimeout(() => {
        onComplete(score + (isCorrect ? 1 : 0) >= 2);
      }, 500);
    }
  };

  const currentItem = INSTRUMENTS[currentIdx];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl w-full bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-parchment-400 flex flex-col items-center text-center my-auto shrink-0"
    >
      <h2 className="text-3xl font-cinzel font-bold text-ink-800 mb-2 tracking-wider">Luthiers al Ataque</h2>
      <p className="text-lg font-baskerville text-ink-900 mb-8 opacity-80">
        Identifica el instrumento correcto para formar tu Consort leyendo la descripción de su sonido.
      </p>

      <div className="w-full bg-white border border-parchment-400 rounded-sm p-6 mb-8 shadow-sm relative">
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-ink-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-gold-500">
           <Ear className="text-white w-6 h-6" />
         </div>
         <div className="mt-4 font-cinzel text-xs uppercase tracking-widest text-gold-500 font-bold mb-2">Escucha con atención...</div>
         
         <AnimatePresence mode="wait">
           <motion.div
             key={currentIdx}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
             <p className="font-baskerville text-xl italic text-ink-900 leading-relaxed mb-6">
               "{currentItem.desc}"
             </p>
             <div className="flex flex-col gap-3 max-w-md mx-auto">
               {currentItem.options.map(opt => (
                 <button
                   key={opt}
                   onClick={() => handleSelect(opt)}
                   className="w-full py-3 px-6 bg-parchment-100 hover:bg-ink-800 hover:text-white border border-ink-800 rounded-sm font-cinzel font-bold tracking-wider transition-all"
                 >
                   {opt}
                 </button>
               ))}
             </div>
           </motion.div>
         </AnimatePresence>
      </div>

    </motion.div>
  );
}
