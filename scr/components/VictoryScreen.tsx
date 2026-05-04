import { motion } from 'motion/react';
import { Player } from '../types';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface VictoryScreenProps {
  player: Player;
  onRestart: () => void;
}

export default function VictoryScreen({ player, onRestart }: VictoryScreenProps) {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b0000', '#b38b4d', '#2c241e']
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="text-center max-w-xl bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl border border-parchment-400 w-full my-auto shrink-0"
    >
      <h1 className="text-4xl font-cinzel font-bold text-crimson-900 mb-6 tracking-wide">
        ¡Obra Maestra Completada!
      </h1>
      <p className="text-xl font-baskerville text-ink-900 mb-6">
        Has completado el Camino del Maestro y reunido <span className="font-bold text-2xl text-crimson-900">{player.hojas}</span> Hojas de Manuscrito.
      </p>
      {player.hojas >= 5 ? (
        <p className="text-lg italic text-ink-800 mb-8 font-baskerville opacity-80">
          Tus obras resonarán en las cortes de toda Europa, desde la Capilla Sixtina hasta la corte de los Reyes Católicos. ¡Eres un verdadero Maestro del Renacimiento!
        </p>
      ) : (
        <p className="text-lg italic text-ink-800 mb-8 font-baskerville opacity-80">
          Has logrado completar tu viaje, pero aún puedes perfeccionar tu arte. ¡Estudia las obras de Ockeghem y vuelve a intentarlo!
        </p>
      )}
      
      <button
        onClick={onRestart}
        className="bg-ink-800 hover:bg-ink-900 text-parchment-100 font-cinzel font-bold py-3 px-8 rounded-sm transition-colors duration-300 text-lg shadow-lg uppercase tracking-widest"
      >
        Nuevo Viaje
      </button>
    </motion.div>
  );
}
