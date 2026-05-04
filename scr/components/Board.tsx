import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Player, Space } from '../types';
import { Scroll, Music, Castle, Map, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

interface BoardProps {
  player: Player;
  onMove: (steps: number) => void;
  boardSpaces: Space[];
}

export default function Board({ player, onMove, boardSpaces }: BoardProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const controls = useAnimation();

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    
    // Simulate roll animation
    const rollSequence = async () => {
      for (let i = 0; i < 10; i++) {
        setDiceValue(Math.floor(Math.random() * 6) + 1);
        await new Promise(r => setTimeout(r, 50));
      }
      const finalSteps = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalSteps);
      
      await controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        transition: { duration: 0.5 }
      });
      
      setTimeout(() => {
        setIsRolling(false);
        onMove(finalSteps);
      }, 500);
    };
    
    rollSequence();
  };

  const currentSpace = boardSpaces[player.position];

  const getSpaceIcon = (type: string) => {
    switch (type) {
      case 'START': return <Map className="w-5 h-5" />;
      case 'HOJA': return <Scroll className="w-5 h-5 text-gold-500" />;
      case 'MINIGAME_1': 
      case 'MINIGAME_2': 
      case 'MINIGAME_3': 
      case 'MINIGAME_4': 
      case 'MINIGAME_5': 
      case 'MINIGAME_6': 
      case 'MINIGAME_7': 
      case 'MINIGAME_8': return <Music className="w-5 h-5 text-crimson-900" />;
      case 'EXAMEN': return <BookOpen className="w-5 h-5 text-ink-800" />;
      case 'FINISH': return <Castle className="w-5 h-5 text-gold-500" />;
      default: return <div className="w-2 h-2 rounded-full bg-parchment-400" />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px] flex-1 w-full max-w-7xl mx-auto items-stretch bg-parchment-100 relative shadow-2xl border-4 border-parchment-400 rounded-lg overflow-hidden shrink-0 my-auto">
      {/* Left: Board Path visualization */}
      <section className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-parchment-100 overflow-y-auto">
        <div className="w-full flex flex-wrap justify-center gap-4 relative">
          {boardSpaces.map((space, index) => {
            const isCurrent = index === player.position;
            const isPassed = index < player.position;
            
            return (
              <div key={space.id} className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
                {/* Space Circle */}
                <div 
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10
                    ${isCurrent ? 'bg-white border-crimson-900 shadow-[0_0_20px_rgba(139,0,0,0.4)] scale-110' : 
                      isPassed ? 'bg-white border-gold-500 opacity-60' : 
                      'bg-white border-parchment-400 opacity-40'}
                  `}
                  title={`${space.label}: ${space.description}`}
                >
                  {getSpaceIcon(space.type)}
                  
                  {/* Player Token */}
                  {isCurrent && (
                    <motion.div 
                      layoutId="player-token"
                      className="absolute -top-2 -right-2 w-6 h-6 bg-crimson-900 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}
                </div>
                
                {/* Connecting Line (except last) */}
                {index < boardSpaces.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 text-parchment-400 z-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Right: Sidebar with Info & Dice */}
      <section className="w-full lg:w-[400px] border-l-2 border-parchment-400 flex flex-col bg-parchment-200 shrink-0 shadow-[-10px_0_20px_rgba(0,0,0,0.05)] z-20">
        <div className="p-4 bg-parchment-300 font-bold uppercase tracking-wider text-xs border-b border-parchment-400 text-ink-800">
          Panel de Control
        </div>
        <div className="p-6 flex-1 flex flex-col items-center">
          <h2 className="text-3xl font-cinzel text-ink-800 mb-6 font-bold text-center border-b-2 border-parchment-400 pb-4 w-full">Tu Turno</h2>
          
          <motion.div 
            animate={controls}
            className="w-24 h-24 bg-white border-4 border-parchment-400 rounded-xl shadow-inner flex items-center justify-center mb-6"
          >
            <span className="text-5xl font-cinzel font-bold text-ink-900">{diceValue}</span>
          </motion.div>
          
          <button
            onClick={handleRoll}
            disabled={isRolling}
            className="w-full bg-ink-800 hover:bg-ink-900 text-parchment-100 font-cinzel font-bold py-3 px-4 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg mb-8 uppercase tracking-widest"
          >
            {isRolling ? 'Lanzando...' : 'Lanzar Dado'}
          </button>

          <div className="bg-white/50 w-full p-4 rounded-sm border border-parchment-400 text-center flex-1 min-h-[150px]">
            <h3 className="font-baskerville text-xs uppercase tracking-widest text-gold-500 mb-2">Posición Actual</h3>
            <p className="font-baskerville text-xl text-ink-900 font-bold mb-2">{currentSpace?.label}</p>
            <p className="font-baskerville text-ink-800 text-sm italic">{currentSpace?.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
