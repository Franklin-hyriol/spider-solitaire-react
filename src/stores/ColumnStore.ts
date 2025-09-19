import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IColumn, ICard, ColumnsStore, Level } from "../types";
import { COLUMN_COUNT } from "../constants/game";
import { shuffleArray } from "../utils/arrayUtils";
import { createDeck } from "../helpers/cardHelpers";
import { useUndoStore } from "./UndoStore";
import { useHintStore } from "./HintStore";
import { hasPossibleMoves } from "../logic/gameLogic";

/**
 * Store Zustand pour gérer l'état global du jeu (colonnes et cartes).
 * `persist` est un middleware qui sauvegarde et restaure automatiquement l'état
 * dans le localStorage du navigateur, ce qui permet de conserver la partie.
 */
export const useColumnsStore = create(
  persist<ColumnsStore>(
    (set, get) => ({
      level: "medium", // Niveau par défaut
      columns: [],
      foundation: [],
      stock: [],
      isGameWon: false,
      isGameOver: false,

      checkGameOver: () => {
        const { stock, columns } = get();
        // La partie ne peut pas être terminée s'il reste des cartes dans la pioche
        if (stock.length > 0) {
          return;
        }

        // S'il n'y a plus de mouvement possible, c'est game over
        if (get().stock.length === 0 && !hasPossibleMoves(columns, get().stock)) {
          set({ isGameOver: true });
        }
      },

      setColumns: (updater) => {
        const newColumns =
          typeof updater === "function" ? updater(get().columns) : updater;
        set({ columns: newColumns });
        get().checkGameOver(); // Vérifie le game over après chaque modification des colonnes
      },

      updateColumn: (id, newColumn) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, ...newColumn } : col
          ),
        })),

      initGame: (level: Level) => {
        const shuffledCards = shuffleArray(createDeck(level));
        const newColumns: IColumn[] = [];
        let cardIndex = 0;

        // Distribution des cartes sur les 10 colonnes
        for (let i = 0; i < COLUMN_COUNT; i++) {
          const columnId = `c${i + 1}`;
          const numCards = i < 4 ? 6 : 5; // 4 colonnes de 6 cartes, 6 de 5
          const cardsInColumn: ICard[] = [];

          for (let j = 0; j < numCards; j++) {
            const card = { ...shuffledCards[cardIndex] };
            card.faceUp = j === numCards - 1; // Seule la dernière est face visible
            cardsInColumn.push(card);
            cardIndex++;
          }

          newColumns.push({
            id: columnId,
            cards: cardsInColumn,
          });
        }

        // Le reste des cartes va dans la pioche
        const stock = shuffledCards.slice(cardIndex);

        // Crée les 8 piles de fondation vides
        const foundation: IColumn[] = Array.from({ length: 8 }, (_, i) => ({
          id: `f${i + 1}`,
          cards: [],
        }));

        set({ level, columns: newColumns, foundation, stock, isGameWon: false, isGameOver: false });
      },

      restartGame: () => {
        const { level, initGame } = get();
        initGame(level);
      },

      revealLastCard: (columnId) =>
        set((state) => ({
          columns: state.columns.map((col) => {
            if (col.id === columnId) {
              const lastCardIndex = (col.cards?.length || 0) - 1;
              if (lastCardIndex >= 0 && col.cards && !col.cards[lastCardIndex].faceUp) {
                const updatedCards = [...col.cards];
                updatedCards[lastCardIndex] = { ...updatedCards[lastCardIndex], faceUp: true };
                return { ...col, cards: updatedCards };
              }
            }
            return col;
          }),
        })),

      dealFromStock: () => {
        useUndoStore.getState().setPreviousState();
        set((state) => {
          // Règle du Spider: On ne peut pas distribuer si une colonne est vide.
          if (state.columns.some((column) => column.cards?.length === 0)) {
            console.warn("Distribution bloquée : au moins une colonne est vide.");
            return state;
          }

          // Ne rien faire si la pioche est vide
          if (state.stock.length === 0) {
            return state;
          }

          // Prend les 10 dernières cartes de la pioche
          const cardsToDeal = state.stock.slice(-10);
          // Met à jour la pioche en retirant ces 10 cartes
          const newStock = state.stock.slice(0, -10);

          // Distribue une carte sur chaque colonne
          const newColumns = state.columns.map((column, index) => {
            const newCard = { ...cardsToDeal[index], faceUp: true };
            return {
              ...column,
              cards: [...(column.cards || []), newCard],
            };
          });

          return { stock: newStock, columns: newColumns };
        });
        get().checkGameOver(); // Vérifie le game over après la distribution
      },

      moveToFoundation: (stack, sourceColumnId, foundationId) =>
        set((state) => {
          // Retire la pile de la colonne d'origine
          const newColumns = state.columns.map((col) => {
            if (col.id === sourceColumnId) {
              return {
                ...col,
                cards: col.cards!.filter((card) => !stack.find((s) => s.id === card.id)),
              };
            }
            return col;
          });

          // Ajoute la pile à la pile de fondation de destination
          const newFoundation = state.foundation.map((pile) => {
            if (pile.id === foundationId) {
              return { ...pile, cards: [...(pile.cards || []), ...stack] };
            }
            return pile;
          });

          // Vérifie si la partie est gagnée
          const allFoundationsFull = newFoundation.every(
            (pile) => pile.cards?.length === 13
          );

          if (allFoundationsFull) {
            useHintStore.getState().clearAllHints(); // Invalider le cache d'indices
            return { columns: newColumns, foundation: newFoundation, isGameWon: true };
          }

          useHintStore.getState().clearAllHints(); // Invalider le cache d'indices
          return { columns: newColumns, foundation: newFoundation };
        }),
    }),
    {
      name: "solitaire-game-columns-state", // Nom de l'élément dans le localStorage
    }
  )
);
