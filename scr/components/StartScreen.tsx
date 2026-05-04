import { motion } from 'motion/react';
import { Music } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center max-w-2xl bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl border border-parchment-400 my-auto shrink-0 w-full"
    >
      <Music className="w-16 h-16 mx-auto mb-6 text-crimson-900" />
      <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-ink-800 mb-4 tracking-wider">
        Renacimiento Party
      </h1>
      <h2 className="text-2xl md:text-3xl font-baskerville italic text-ink-900 mb-8 opacity-80">
        El Camino del Maestro
      </h2>
      <p className="text-lg text-ink-900 mb-8 font-baskerville">
        Recorre las grandes cortes musicales de Europa. Supera retos teóricos e históricos para reunir Hojas de Manuscrito y componer tu Obra Maestra guiado por el espíritu de Josquin, Palestrina y Petrucci.
      </p>
      <button
        onClick={onStart}
        className="bg-ink-800 hover:bg-ink-900 text-parchment-100 font-cinzel font-bold py-3 px-8 rounded-sm transition-colors duration-300 text-xl shadow-lg uppercase tracking-widest"
      >
        Iniciar Viaje Musical
      </button>
    </motion.div>
  );
}
