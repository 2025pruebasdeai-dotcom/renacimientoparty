import { motion } from 'motion/react';

export default function Notification({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-20 bg-white/90 backdrop-blur-sm text-ink-900 border border-gold-500 px-6 py-3 rounded-sm shadow-xl font-cinzel font-bold text-sm uppercase tracking-widest z-50 text-center"
    >
      {message}
    </motion.div>
  );
}
