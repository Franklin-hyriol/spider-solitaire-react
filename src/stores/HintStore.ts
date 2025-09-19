import { create } from "zustand";
import type { Hint } from "../logic/gameLogic";

interface HintStore {
  hint: Hint | null;
  setHint: (hint: Hint | null) => void;
  clearHint: () => void;
}

export const useHintStore = create<HintStore>((set) => ({
  hint: null,
  setHint: (hint) => set({ hint }),
  clearHint: () => set({ hint: null }),
}));
