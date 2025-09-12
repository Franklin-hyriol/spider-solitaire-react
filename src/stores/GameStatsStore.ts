import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PlayerMood, type GameStatsStore } from "../types";
// import { cryptoLocalStorage } from "../helpers/cryptoLocalStorage"; // Import the custom storage

export const useGameStatsStore = create(
    persist<GameStatsStore>(
        (set, get) => ({
            elapsedTime: 0, // Secondes écoulées
            isRunning: false,
            money: 6000,
            moves: 0,
            completedSets: 0,
            gameStartDate: null,
            mood: PlayerMood.Calm,

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
                    mood: PlayerMood.Calm,
                }),

            addMove: () => set((s) => ({ moves: s.moves + 1 })),
            addMoney: (amount) => set((s) => ({ money: s.money + amount })),
            addCompletedSet: () => set((s) => ({ completedSets: s.completedSets + 1 })),

            getElapsed: () => get().elapsedTime,

            setMood: (mood: PlayerMood) => set({ mood }),
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
                mood: state.mood,
            } as any), // eslint-disable-line @typescript-eslint/no-explicit-any
        }
    )
);
