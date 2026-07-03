export interface PlayerStats {
  velocidad: number;
  fuerza: number;
  tecnica: number;
  vision: number;
  mentalidad: number;
}

export interface PlayerEvaluation {
  nickname: string;
  auraColor: string;
  specialMove: string;
  specialMoveDescription: string;
  sovereignRank: string;
  tacticalAnalysis: string;
  emperorQuote: string;
  stats: PlayerStats;
}
