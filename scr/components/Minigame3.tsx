import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Minigame3Props {
  onComplete: (success: boolean) => void;
}

const CONSONANCES = ['3ra Mayor', '3ra Menor', '5ta Justa', '6ta Mayor', '6ta Menor', '8va Justa'];
const DISSONANCES = ['2da Mayor', '2da Menor', '4ta Justa', '7ma Mayor', '7ma Menor', 'Tritono'];

type Bubble = {
  id: number;
  text: string;
  isConsonance: boolean;
  x: number;
};

export default function Minigame3({ onComplete }: Minigame3Props) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      setIsActive(false);
      setTimeout(() => {
        onComplete(score >= 5);
      }, 2000);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, score, onComplete]);

  useEffect(() => {
    if (!isActive) return;

    const spawner = setInterval(() => {
      const isConsonance = Math.random() > 0.4;
      const textArray = isConsonance ? CONSONANCES : DISSONANCES;
      const text = textArray[Math.floor(Math.random() * textArray.length)];
      
      const newBubble: Bubble = {
        id: Date.now() + Math.random(),
        text,
        isConsonance,
        x: Math.floor(Math.random() * 80) + 10 // 10% to 90%
      };
      
      setBubbles(prev => [...prev, newBubble]);
      
      // Auto-remove after animation
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, 3000);
    }, 800);

    return () => clearInterval(spawner);
  }, [isActive]);

  const handleBubbleClick = (bubble: Bubble) => {
    if (!isActive) return;
    
    if (bubble.isConsonance) {
      setScore(prev => prev + 1);
    } else {
      setScore(prev => prev - 1);
    }
    
    setBubbles(prev => prev.filter(b => b.id !== bubble.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl w-full bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-parchment-400 text-center my-auto shrink-0"
    >
      <h2 className="text-3xl font-cinzel font-bold text-ink-800 mb-2 tracking-wider">¡Cuidado con la Disonancia!</h2>
      <p className="text-lg font-baskerville text-ink-900 mb-6 opacity-80">
        Escuela Franco-Flamenca: Presiona las consonancias (3ras, 5tas, 6tas, 8vas) y evita las disonancias y tritonos. Consigue al menos 5 puntos.
      </p>

      {!isActive && timeLeft === 15 ? (
        <button
          onClick={() => setIsActive(true)}
          className="bg-ink-800 hover:bg-ink-900 text-parchment-100 font-cinzel font-bold py-3 px-8 rounded-sm transition-colors text-lg uppercase tracking-widest shadow-md"
        >
          Comenzar Contrapunto
        </button>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4 px-4 bg-white/50 py-2 rounded-sm border border-parchment-400">
            <div className="text-lg font-cinzel font-bold text-ink-800 tracking-wider">Armonía: <span className={score >= 0 ? "text-olive" : "text-crimson-900"}>{score}</span></div>
            <div className="text-lg font-cinzel font-bold text-ink-800 tracking-wider">Tiempo: <span className="text-gold-500">{timeLeft}s</span></div>
          </div>
          
          <div className="relative w-full h-80 bg-white/30 border border-parchment-400 rounded-sm overflow-hidden shadow-inner">
            <AnimatePresence>
              {bubbles.map(bubble => (
                <motion.button
                  key={bubble.id}
                  initial={{ y: 320, opacity: 0, scale: 0.5 }}
                  animate={{ y: -50, opacity: 1, scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 3, ease: 'linear' }}
                  onClick={() => handleBubbleClick(bubble)}
                  style={{ left: `${bubble.x}%` }}
                  className="absolute w-24 h-24 rounded-full bg-parchment-200 border border-gold-500 shadow-md flex items-center justify-center cursor-crosshair transform -translate-x-1/2 hover:scale-105"
                >
                  <span className="font-cinzel font-bold text-ink-800 text-sm leading-tight px-2">{bubble.text}</span>
                </motion.button>
              ))}
            </AnimatePresence>
            {timeLeft <= 0 && (
              <div className="absolute inset-0 bg-parchment-100/90 flex items-center justify-center backdrop-blur-md z-20">
                 <h3 className="text-3xl font-cinzel font-bold text-ink-800 tracking-wider">
                   {score >= 5 ? '¡Armonía Perfecta!' : '¡Diabolus in Musica!'}
                 </h3>
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
