import { useState } from 'react';
import { motion } from 'motion/react';

interface Minigame8Props {
  onComplete: (success: boolean) => void;
}

const QUESTIONS = [
  {
    id: 1,
    cadence: "Cadencia en Re (Modo Dórico)",
    context: "La voz superior desciende Re -> Do -> Re. La inferior asciende La -> Do -> Re.",
    question: "¿Debe el 'Do' alterarse a 'Do#' (Musica Ficta)?",
    answer: true,
    explanation: "Sí, en las cadencias hacia Re, el Do debe elevarse para crear la sensible (cláusula vera)."
  },
  {
    id: 2,
    cadence: "Movimiento de Voces",
    context: "La voz superior canta 'Mi' y la inferior canta 'Fa' simultáneamente.",
    question: "¿Se debe aplicar Música Ficta (Fa# o Mib) para evitar la disonancia?",
    answer: true,
    explanation: "Sí, el 'Mi contra Fa' genera un choque que a menudo requiere alteración para evitar el tritono o disonancias duras."
  },
  {
    id: 3,
    cadence: "Cadencia en Mi (Modo Frigio)",
    context: "La voz superior desciende Fa -> Mi. La inferior asciende Re -> Mi.",
    question: "¿Se debe alterar el 'Re' a 'Re#' para hacer una sensible hacia el Mi?",
    answer: false,
    explanation: "No. En el modo Frigio, la cadencia natural ya tiene un semitono descendente (Fa-Mi). Elevar el Re a Re# desvirtuaría el carácter del modo."
  }
];

export default function Minigame8({ onComplete }: Minigame8Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === QUESTIONS[currentIdx].answer;
    setLastAnswerCorrect(isCorrect);
    if (isCorrect) setScore(score + 1);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setTimeout(() => {
        onComplete(score + (lastAnswerCorrect ? 1 : 0) >= 2);
      }, 500);
    }
  };

  const currentQ = QUESTIONS[currentIdx];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl w-full bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-parchment-400 my-auto shrink-0"
    >
      <h2 className="text-3xl font-cinzel font-bold text-ink-800 mb-6 text-center tracking-wider">El Juez de la Ficta</h2>
      
      {!showExplanation ? (
        <motion.div key={currentIdx} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <div className="bg-white/50 p-6 rounded-sm border border-parchment-400 mb-6 relative shadow-sm">
            <span className="absolute -top-3 -left-3 bg-crimson-900 text-parchment-100 w-8 h-8 rounded-full flex items-center justify-center font-bold font-baskerville shadow-md">
              {currentIdx + 1}
            </span>
            <h3 className="text-xl font-cinzel font-bold text-ink-800 mb-2">{currentQ.cadence}</h3>
            <p className="text-ink-900 font-baskerville italic mb-4 opacity-80">{currentQ.context}</p>
            <p className="text-lg font-bold text-crimson-900 mb-6 font-baskerville">{currentQ.question}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => handleAnswer(true)} className="bg-ink-800 hover:bg-ink-900 text-parchment-100 font-cinzel font-bold py-2 px-6 rounded-sm transition-colors text-sm uppercase tracking-widest shadow-sm">
                Sí, aplicar Ficta
              </button>
              <button onClick={() => handleAnswer(false)} className="bg-white hover:bg-parchment-200 border border-ink-800 text-ink-800 font-cinzel font-bold py-2 px-6 rounded-sm transition-colors text-sm uppercase tracking-widest shadow-sm">
                No, mantener diatónico
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/50 p-6 rounded-sm border border-parchment-400 mb-6 text-center shadow-sm">
           <h3 className={`text-2xl font-cinzel font-bold mb-4 ${lastAnswerCorrect ? 'text-green-800' : 'text-crimson-900'}`}>
             {lastAnswerCorrect ? '¡Decisión Correcta!' : 'Decisión Incorrecta'}
           </h3>
           <p className="text-ink-900 font-baskerville text-lg mb-6 leading-relaxed opacity-90">{currentQ.explanation}</p>
           <button onClick={nextQuestion} className="bg-ink-800 hover:bg-ink-900 text-parchment-100 font-cinzel font-bold py-2 px-8 rounded-sm transition-colors uppercase tracking-widest shadow-sm">
             {currentIdx < QUESTIONS.length - 1 ? 'Siguiente Cadencia' : 'Finalizar Veredicto'}
           </button>
        </motion.div>
      )}

      <div className="text-center font-cinzel text-gold-500 uppercase tracking-widest text-sm font-bold">
        Puntuación: {score} / 3 (Se requieren 2 para aprobar)
      </div>
    </motion.div>
  );
}
