import { create } from "zustand";
import type { Hint } from "../logic/gameLogic";

interface HintStore {
  allHints: Hint[];
  hintIndex: number;
  hintToShow: Hint | null;
  hintPhase: "idle" | "source" | "dest";

  setAllHints: (hints: Hint[]) => void;
  clearAllHints: () => void;
  triggerHintSequence: () => void;
}

let sequenceTimer1: NodeJS.Timeout;
let sequenceTimer2: NodeJS.Timeout;

export const useHintStore = create<HintStore>((set, get) => ({
  allHints: [],
  hintIndex: -1,
  hintToShow: null,
  hintPhase: "idle",

  setAllHints: (hints) => set({ allHints: hints, hintIndex: -1 }),

  clearAllHints: () => {
    clearTimeout(sequenceTimer1);
    clearTimeout(sequenceTimer2);
    set({ allHints: [], hintIndex: -1, hintToShow: null, hintPhase: "idle" });
  },

  triggerHintSequence: () => {
    const { allHints, hintIndex } = get();
    if (allHints.length === 0) return;

    // Nettoyer les anciens timers pour éviter les bugs visuels
    clearTimeout(sequenceTimer1);
    clearTimeout(sequenceTimer2);

    const nextIndex = (hintIndex + 1) % allHints.length;
    const nextHint = allHints[nextIndex];

    // Phase 1: La source s'allume immédiatement
    set({ hintIndex: nextIndex, hintToShow: nextHint, hintPhase: "source" });

    if (nextHint.type === "move") {
      // Phase 2: La destination s'allume après 1s
      sequenceTimer1 = setTimeout(() => {
        set({ hintPhase: "dest" });
      }, 1000);
    }

    // Phase 3: Tout s'éteint après 3s
    sequenceTimer2 = setTimeout(() => {
      set({ hintToShow: null, hintPhase: "idle" });
    }, 3000);
  },
}));
