export type GameState = 'START' | 'BOARD' | 'MINIGAME_1' | 'MINIGAME_2' | 'MINIGAME_3' | 'MINIGAME_4' | 'MINIGAME_5' | 'MINIGAME_6' | 'MINIGAME_7' | 'MINIGAME_8' | 'EXAMEN_PAPA' | 'VICTORY';

export interface Player {
  position: number;
  hojas: number;
}

export type SpaceType = 'START' | 'BLANK' | 'MINIGAME_1' | 'MINIGAME_2' | 'MINIGAME_3' | 'MINIGAME_4' | 'MINIGAME_5' | 'MINIGAME_6' | 'MINIGAME_7' | 'MINIGAME_8' | 'EXAMEN' | 'HOJA' | 'FINISH';

export interface Space {
  id: number;
  type: SpaceType;
  label: string;
  description: string;
}
