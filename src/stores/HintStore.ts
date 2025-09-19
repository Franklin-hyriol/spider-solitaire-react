import { create } from "zustand";
import type { Hint } from "../logic/gameLogic";

interface HintStore {
  allHints: Hint[];
  hintIndex: number;
  currentHint: Hint | null;
  setAllHints: (hints: Hint[]) => void;
  clearAllHints: () => void;
  showNextHint: () => void;
  setCurrentHint: (hint: Hint | null) => void;
}

export const useHintStore = create<HintStore>((set, get) => ({
  allHints: [],
  hintIndex: -1,
  currentHint: null,

  setAllHints: (hints) => set({ allHints: hints, hintIndex: -1 }),

  clearAllHints: () => set({ allHints: [], hintIndex: -1, currentHint: null }),

  showNextHint: () => {
    const { allHints, hintIndex } = get();
    if (allHints.length === 0) return;

    const nextIndex = (hintIndex + 1) % allHints.length;
    set({ hintIndex: nextIndex, currentHint: allHints[nextIndex] });
  },

  setCurrentHint: (hint) => set({ currentHint: hint }),
}));
