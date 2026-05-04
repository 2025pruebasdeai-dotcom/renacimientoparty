import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Minigame4Props {
  onComplete: (success: boolean) => void;
}

const PHASES = [
  { sign: 'C', name: 'Tempus Imperfectum', speed: 2000, desc: 'Ritmo moderado' },
  { sign: 'O', name: 'Tempus Perfectum', speed: 1200, desc: 'Ritmo rápido' },
  { sign: 'C|', name: 'Alla Breve', speed: 800, desc: 'Ritmo muy rápido' },
];

export default function Minigame4({ onComplete }: Minigame4Props) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pulsePos, setPulsePos] = useState(0); // 0 to 100
  const [direction, setDirection] = useState(1);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [feedback, setFeedback] = useState<'Excelente' | 'Fallo' | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      const phase = PHASES[phaseIndex];
      // distance = speed * time, we want to cross 100 in `phase.speed` ms
      const deltaPos = (deltaTime / phase.speed) * 100;

      setPulsePos(prev => {
        let nextPos = prev + deltaPos * direction;
        if (nextPos >= 100) {
          nextPos = 100 - (nextPos - 100);
          setDirection(-1);
        } else if (nextPos <= 0) {
          nextPos = -nextPos;
          setDirection(1);
        }
        return nextPos;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isPlaying, phaseIndex, direction]);

  const handlePulse = () => {
    if (!isPlaying) return;
    
    // Valid zone is between 40 and 60
    if (pulsePos >= 40 && pulsePos <= 60) {
      setScore(s => s + 1);
      setFeedback('Excelente');
    } else {
      setScore(s => Math.max(0, s - 1));
      setFeedback('Fallo');
    }

    setTimeout(() => setFeedback(null), 500);

    if (score + 1 >= 5 && phaseIndex < PHASES.length - 1) {
      setScore(0);
      setPhaseIndex(p => p + 1);
    } else if (score + 1 >= 5 && phaseIndex === PHASES.length - 1) {
      setIsPlaying(false);
      setTimeout(() => onComplete(true), 1000);
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
    lastTimeRef.current = 0;
  };

  const currentPhase = PHASES[phaseIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-xl w-full bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-parchment-400 text-center my-auto shrink-0"
    >
      <h2 className="text-3xl font-cinzel font-bold text-ink-800 mb-2 tracking-wider">Reloj de Proporciones</h2>
      <p className="text-lg font-baskerville text-ink-900 mb-6 opacity-80">
        Mantén el pulso según el signo de mensuración. Presiona cuando la esfera cruce la zona dorada.
      </p>

      {!isPlaying ? (
        <button onClick={handleStart} className="bg-ink-800 hover:bg-ink-900 text-parchment-100 font-cinzel font-bold py-3 px-8 rounded-sm transition-colors text-lg uppercase tracking-widest shadow-md">
          Comenzar
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <div className="text-5xl font-cinzel font-bold text-crimson-900 mb-2 border-2 border-crimson-900 w-24 h-24 flex items-center justify-center rounded-full bg-white mx-auto shadow-md">
              {currentPhase.sign}
            </div>
            <h3 className="font-baskerville text-xl font-bold text-ink-900">{currentPhase.name}</h3>
            <p className="italic text-ink-800 text-sm">{currentPhase.desc}</p>
          </div>

          <div className="w-full h-12 bg-white border-2 border-parchment-400 rounded-full relative mb-8 overflow-hidden shadow-inner flex items-center">
            {/* Target zone */}
            <div className="absolute left-[40%] right-[40%] top-0 bottom-0 bg-gold-500/30 border-x-2 border-gold-500" />
            
            {/* Moving pulse */}
            <div 
              className="absolute w-8 h-8 bg-crimson-900 rounded-full shadow-md transform -translate-x-1/2"
              style={{ left: `${pulsePos}%` }}
            />
          </div>

          <button 
            onMouseDown={handlePulse}
            className="w-32 h-32 rounded-full border-4 border-ink-800 bg-white hover:bg-parchment-200 active:bg-parchment-300 text-ink-900 font-cinzel font-bold text-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center outline-none"
          >
            PULSO
          </button>

          <div className="mt-8 flex justify-between w-full px-4 items-center h-8">
            <span className="font-cinzel text-ink-800 font-bold tracking-widest uppercase">Puntos: {score}/5</span>
            {feedback && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`font-bold font-baskerville ${feedback === 'Excelente' ? 'text-green-700' : 'text-crimson-900'}`}
              >
                ¡{feedback}!
              </motion.span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
