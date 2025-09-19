import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type GameStatsStore } from "../types";
import { useColumnsStore } from "./ColumnStore";
import { useHintStore } from "./HintStore";
import { findAllMoves } from "../logic/gameLogic";

export const useGameStatsStore = create(
    persist<GameStatsStore>(
        (set, get) => ({
            elapsedTime: 0, // Secondes écoulées
            isRunning: false,
            money: 6000,
            moves: 0,
            completedSets: 0,
            gameStartDate: null,
            undos: 0,
            hints: 0,

            start: () => set({ isRunning: true }),

            pause: () => set({ isRunning: false }),

            resume: () => set({ isRunning: true }),

            incrementTime: () => set((state) => ({ elapsedTime: state.elapsedTime + 1 })),

            reset: () =>
                set({
                    elapsedTime: 0,
                    isRunning: false,
                    money: 6000,
                    moves: 0,
                    completedSets: 0,
                    gameStartDate: null,
                    undos: 0,
                    hints: 0,
                }),

            addMove: () => set((s) => ({ moves: s.moves + 1 })),
            addUndo: () => set((s) => ({ undos: s.undos + 1 })),
            addHint: () => set((s) => ({ hints: s.hints + 1 })),
            addMoney: (amount) => set((s) => ({ money: s.money + amount })),
            addCompletedSet: () => set((s) => ({ completedSets: s.completedSets + 1 })),

            showHint: () => {
                const { allHints } = useHintStore.getState();
                const { columns, stock } = useColumnsStore.getState();

                let hintsToCache = allHints;

                // Si le cache est vide, on calcule les indices et on les stocke
                if (hintsToCache.length === 0) {
                    hintsToCache = findAllMoves(columns, stock);
                    useHintStore.getState().setAllHints(hintsToCache);
                }

                // Si des indices existent (après calcul si nécessaire), on déclenche la séquence
                if (useHintStore.getState().allHints.length > 0) {
                    get().addHint();
                    useHintStore.getState().triggerHintSequence();
                }
            },

            getElapsed: () => get().elapsedTime,
        }),
        {
            name: "solitaire-game-stats",
            partialize: (state) => ({
                elapsedTime: state.elapsedTime,
                isRunning: state.isRunning,
                money: state.money,
                moves: state.moves,
                completedSets: state.completedSets,
                gameStartDate: state.gameStartDate,
                undos: state.undos,
                hints: state.hints,
            } as any), // eslint-disable-line @typescript-eslint/no-explicit-any
        }
    )
);
