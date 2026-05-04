import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BOARD_SPACES, MAX_POSITION } from './data';
import { GameState, Player, Space } from './types';
import Board from './components/Board';
import Minigame1 from './components/Minigame1';
import Minigame2 from './components/Minigame2';
import Minigame3 from './components/Minigame3';
import Minigame4 from './components/Minigame4';
import Minigame5 from './components/Minigame5';
import Minigame6 from './components/Minigame6';
import Minigame7 from './components/Minigame7';
import Minigame8 from './components/Minigame8';
import ExamenPapa from './components/ExamenPapa';
import StartScreen from './components/StartScreen';
import VictoryScreen from './components/VictoryScreen';
import Notification from './components/Notification';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [player, setPlayer] = useState<Player>({ position: 0, hojas: 0 });
  const [notification, setNotification] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  const resetGame = () => {
    setPlayer({ position: 0, hojas: 0 });
    setGameState('START');
  };

  const showNotification = (msg: string) => {
    setNotification({ message: msg, show: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleMove = (steps: number) => {
    let newPos = player.position + steps;
    if (newPos > MAX_POSITION) newPos = MAX_POSITION;
    
    setPlayer(prev => ({ ...prev, position: newPos }));
    
    const landedSpace = BOARD_SPACES[newPos];
    setTimeout(() => {
      handleSpaceAction(landedSpace);
    }, 1000); // Wait for movement animation
  };

  const handleSpaceAction = (space: Space) => {
    switch (space.type) {
      case 'MINIGAME_1':
        setGameState('MINIGAME_1');
        break;
      case 'MINIGAME_2':
        setGameState('MINIGAME_2');
        break;
      case 'MINIGAME_3':
        setGameState('MINIGAME_3');
        break;
      case 'MINIGAME_4':
        setGameState('MINIGAME_4');
        break;
      case 'MINIGAME_5':
        setGameState('MINIGAME_5');
        break;
      case 'MINIGAME_6':
        setGameState('MINIGAME_6');
        break;
      case 'MINIGAME_7':
        setGameState('MINIGAME_7');
        break;
      case 'MINIGAME_8':
        setGameState('MINIGAME_8');
        break;
      case 'EXAMEN':
        setGameState('EXAMEN_PAPA');
        break;
      case 'HOJA':
        setPlayer(prev => ({ ...prev, hojas: prev.hojas + 1 }));
        showNotification('¡Encontraste una Hoja de Manuscrito! +1 📜');
        break;
      case 'FINISH':
        setGameState('VICTORY');
        break;
      default:
        // BLANK or START, do nothing
        break;
    }
  };

  const onMinigameComplete = (success: boolean) => {
    if (success) {
      setPlayer(prev => ({ ...prev, hojas: prev.hojas + 1 }));
      showNotification('¡Éxito! Has ganado una Hoja de Manuscrito 📜');
    } else {
      showNotification('Vaya... No has superado la prueba.');
    }
    setGameState('BOARD');
  };

  return (
    <div className="h-screen flex flex-col border-[12px] border-parchment-400 overflow-hidden bg-parchment-100 font-baskerville">
      <header className="p-4 md:p-6 border-b-2 border-parchment-400 bg-white/30 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-ink-800 tracking-widest">Renacimiento Party</h1>
          <p className="italic text-sm opacity-70">El Camino del Maestro: Un Viaje por la Historia de la Música</p>
        </div>

        {gameState !== 'START' && (
          <div className="flex gap-4 md:gap-8 items-center">
             <div className="text-center hidden sm:block">
               <div className="text-[10px] md:text-xs uppercase tracking-widest text-gold-500">Ubicación Actual</div>
               <div className="font-bold text-sm md:text-lg">{BOARD_SPACES[player.position]?.label}</div>
             </div>
             
             <div className="h-10 md:h-12 w-px bg-parchment-400 hidden sm:block"></div>
             
             <div className="flex flex-col items-center md:items-end">
               <div className="text-[10px] md:text-xs uppercase tracking-widest text-gold-500 mb-1">Hojas de Manuscrito</div>
               <div className="flex items-center gap-2">
                 <div className="flex gap-1" title={`${player.hojas} / 8`}>
                   {Array.from({length: 8}).map((_, i) => (
                     <div key={i} className={`w-3 h-4 bg-gold-500 ${i < player.hojas ? '' : 'opacity-20'}`} style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%)' }}></div>
                   ))}
                 </div>
                 <span className="font-bold ml-1">{player.hojas} / 8</span>
               </div>
             </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col overflow-y-auto relative items-center p-4 py-8 bg-[url('https://www.transparenttextures.com/patterns/papyrus.png')]">
        <AnimatePresence mode="wait">
          {gameState === 'START' && <StartScreen key="start" onStart={() => setGameState('BOARD')} />}
          {gameState === 'BOARD' && <Board key="board" player={player} onMove={handleMove} boardSpaces={BOARD_SPACES} />}
          {gameState === 'MINIGAME_1' && <Minigame1 key="m1" onComplete={onMinigameComplete} />}
          {gameState === 'MINIGAME_2' && <Minigame2 key="m2" onComplete={onMinigameComplete} />}
          {gameState === 'MINIGAME_3' && <Minigame3 key="m3" onComplete={onMinigameComplete} />}
          {gameState === 'MINIGAME_4' && <Minigame4 key="m4" onComplete={onMinigameComplete} />}
          {gameState === 'MINIGAME_5' && <Minigame5 key="m5" onComplete={onMinigameComplete} />}
          {gameState === 'MINIGAME_6' && <Minigame6 key="m6" onComplete={onMinigameComplete} />}
          {gameState === 'MINIGAME_7' && <Minigame7 key="m7" onComplete={onMinigameComplete} />}
          {gameState === 'MINIGAME_8' && <Minigame8 key="m8" onComplete={onMinigameComplete} />}
          {gameState === 'EXAMEN_PAPA' && <ExamenPapa key="ep" onComplete={onMinigameComplete} />}
          {gameState === 'VICTORY' && <VictoryScreen key="victory" player={player} onRestart={resetGame} />}
        </AnimatePresence>

        <AnimatePresence>
          {notification.show && <Notification message={notification.message} />}
        </AnimatePresence>
      </main>

      <footer className="h-12 bg-ink-900 text-parchment-100 flex items-center px-4 md:px-6 justify-between text-[10px] uppercase tracking-widest shrink-0">
        <div>© MMXXVI - Proyecto Educativo Renacimiento</div>
        <div className="flex gap-4">
          <span className="hidden sm:inline">Estatus: Maestro en Formación</span>
          <span className="text-gold-500">Puntaje: {player.position * 10}</span>
        </div>
      </footer>
    </div>
  );
}
