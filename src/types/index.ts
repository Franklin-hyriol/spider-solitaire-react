import type { IconType } from "react-icons";

// Représentation d'une carte
export interface ICard {
  id: string;
  value: number;
  faceUp: boolean;
}

// Représentation d'une colonne de cartes
export interface IColumn {
  id: string;
  cards: ICard[] | [] | null;
}

// Store pour gérer les colonnes et les cartes
export interface ColumnsStore {
  level: Level;
  columns: IColumn[];
  foundation: IColumn[];
  stock: ICard[];
  isGameWon?: boolean;
  setColumns: (updater: IColumn[] | ((prev: IColumn[]) => IColumn[])) => void;
  updateColumn: (id: string, newColumn: Partial<IColumn>) => void;
  initGame: (level: Level) => void;
  restartGame: () => void;
  revealLastCard: (columnId: string) => void;
  dealFromStock: () => void;
  moveToFoundation: (stack: ICard[], sourceColumnId: string, foundationId: string) => void;
}


// Props pour afficher une stat avec icône
export interface StatProps {
  icon: IconType;
  label: string;
  value: string;
}


// Store dédié aux stats du jeu (timer, argent, coups, suites complétées)
export interface GameStatsStore {
  elapsedTime: number; // secondes écoulées
  isRunning: boolean; // chrono en cours ou non
  money: number;
  moves: number;
  completedSets: number;
  gameStartDate: number | null; // timestamp de début de la partie pour lister les saves
  undos: number;
  hints: number;

  // actions pour gérer le jeu
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  incrementTime: () => void;
  addMove: () => void;
  addUndo: () => void;
  addHint: () => void;
  addMoney: (amount: number) => void;
  addCompletedSet: () => void;

  // getter pour obtenir le temps écoulé
  getElapsed: () => number;
}


// Type pour les popups
export type PopupType = "new" | "pause" | "quit" | "confirmRestart" | "gameWon" | "help" | boolean;

// Niveaux de difficulté
export type Level = "easy" | "medium" | "hard";