import { Space } from './types';

export const BOARD_SPACES: Space[] = [
  { id: 0, type: 'START', label: 'Inicio', description: 'Comienza tu viaje en el Renacimiento.' },
  { id: 1, type: 'BLANK', label: 'Camino', description: 'Avanzas por Italia.' },
  { id: 2, type: 'HOJA', label: 'Hoja de Manuscrito', description: 'Encuentras un fragmento de una obra.' },
  { id: 3, type: 'MINIGAME_1', label: 'La Imprenta', description: 'Visitas la imprenta de Petrucci en Venecia.' },
  { id: 4, type: 'BLANK', label: 'Camino', description: 'Viajas hacia Francia.' },
  { id: 5, type: 'MINIGAME_2', label: 'Los Modos', description: 'Encuentras el laberinto de los modos.' },
  { id: 6, type: 'HOJA', label: 'Hoja de Manuscrito', description: 'Un mecenas te obsequia una hoja.' },
  { id: 7, type: 'EXAMEN', label: 'Examen del Papa', description: 'El Papa pone a prueba tus conocimientos.' },
  { id: 8, type: 'MINIGAME_3', label: 'Contrapunto', description: 'Josquin des Prez te desafía.' },
  { id: 9, type: 'BLANK', label: 'Camino', description: 'Llegas a la corte de Borgoña.' },
  { id: 10, type: 'MINIGAME_4', label: 'Proporciones', description: 'Un desafío de notación mensural.' },
  { id: 11, type: 'HOJA', label: 'Hoja de Manuscrito', description: 'Recuperas una hoja perdida.' },
  { id: 12, type: 'EXAMEN', label: 'Examen del Rey', description: 'La corte pide que demuestres tu teoría.' },
  { id: 13, type: 'MINIGAME_5', label: 'Arquitectos', description: 'Construye el ordinario de la misa.' },
  { id: 14, type: 'BLANK', label: 'Camino', description: 'Caminas hacia Madrid.' },
  { id: 15, type: 'MINIGAME_6', label: 'Madrigalismos', description: 'El salón del madrigal te espera.' },
  { id: 16, type: 'HOJA', label: 'Hoja de Manuscrito', description: 'Compones una nueva melodía.' },
  { id: 17, type: 'EXAMEN', label: 'Examen de Capilla', description: 'Prueba de maestro de capilla.' },
  { id: 18, type: 'MINIGAME_7', label: 'Luthiers', description: 'Identifica los instrumentos del consort.' },
  { id: 19, type: 'BLANK', label: 'Camino', description: 'Te acercas a tu destino.' },
  { id: 20, type: 'HOJA', label: 'Hoja de Manuscrito', description: 'La última pieza de tu obra maestra.' },
  { id: 21, type: 'MINIGAME_8', label: 'Música Ficta', description: 'Un coro necesita ayuda con su afinación.' },
  { id: 22, type: 'EXAMEN', label: 'Examen Final', description: 'Última prueba de conocimiento.' },
  { id: 23, type: 'FINISH', label: 'Obra Maestra', description: '¡Has completado tu camino!' },
];

export const MAX_POSITION = BOARD_SPACES.length - 1;
