import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

interface ExamenPapaProps {
  onComplete: (success: boolean) => void;
}

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function ExamenPapa({ onComplete }: ExamenPapaProps) {
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error("GEMINI_API_KEY no encontrada");
        }
        
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Actúa como el Papa durante el Renacimiento examinando a un músico sobre Teoría de la Música Renacentista. 
Genera una pregunta de opción múltiple basada en estos temas: Humanismo musical, Imprenta de Petrucci, Modos Eclesiásticos (Dórico, Frigio, Lidio, Mixolidio), Contrapunto de Fux, Técnica del Cantus Firmus, Formas Musicales (Misa, Motete, Madrigal) o Música Ficta (tritono, mi contra fa).

Devuelve UNA RESPUESTA ESTRICTAMENTE EN FORMATO JSON con la siguiente estructura, sin markdown ni comillas invertidas:
{
  "question": "Pregunta teórica...",
  "options": ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
  "correctIndex": 0, /* índice de la respuesta correcta */
  "explanation": "Explicación histórica y teórica..."
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const text = response.text || '';
        // Clean markdown code blocks if any
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonStr);
        setQuestionData(data);
      } catch (err) {
        console.error(err);
        // Fallback question if API fails
        setQuestionData({
          question: "¿Cuál fue la mayor contribución de Ottaviano Petrucci a la música del Renacimiento?",
          options: [
            "La invención del contrapunto a cuatro voces",
            "La primera impresión de música polifónica con tipos móviles en 1501",
            "La consolidación de los modos jonico y eólico",
            "La creación de la Misa Parodia"
          ],
          correctIndex: 1,
          explanation: "Petrucci publicó el 'Harmonice Musices Odhecaton' en 1501, revolucionando la transmisión de la música mediante un sistema de triple impresión."
        });
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, []);

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    
    setTimeout(() => {
      onComplete(index === questionData?.correctIndex);
    }, 4000); // Wait to read explanation
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl w-full bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-parchment-400 my-auto shrink-0"
    >
      <h2 className="text-3xl font-cinzel font-bold text-ink-800 mb-6 text-center border-b border-parchment-400 pb-4 tracking-wider">
        Tribunal Papal
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crimson-900 mb-4"></div>
          <p className="font-baskerville text-ink-800 italic text-xl opacity-80">Su Santidad está deliberando la pregunta...</p>
        </div>
      ) : questionData ? (
        <div className="animate-fade-in">
          <p className="text-xl font-bold text-ink-900 mb-6 text-center font-baskerville leading-relaxed">
            "{questionData.question}"
          </p>
          
          <div className="space-y-3 mb-6">
            {questionData.options.map((option, idx) => {
              let btnClass = "bg-white hover:bg-parchment-200 border-parchment-400 text-ink-900";
              if (selectedOption !== null) {
                if (idx === questionData.correctIndex) {
                  btnClass = "bg-green-700/10 text-green-900 border-green-700";
                } else if (idx === selectedOption) {
                  btnClass = "bg-red-700/10 text-crimson-900 border-crimson-900";
                } else {
                  btnClass = "bg-parchment-200 opacity-50 cursor-not-allowed border-parchment-300";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left px-6 py-3 rounded-sm border transition-all font-baskerville text-base shadow-sm ${btnClass}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-sm border ${selectedOption === questionData.correctIndex ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}
            >
              <h4 className="font-cinzel font-bold mb-2 uppercase tracking-widest text-sm">
                {selectedOption === questionData.correctIndex ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
              </h4>
              <p className="font-baskerville text-ink-900 opacity-90">{questionData.explanation}</p>
            </motion.div>
          )}
        </div>
      ) : null}
    </motion.div>
  );
}
