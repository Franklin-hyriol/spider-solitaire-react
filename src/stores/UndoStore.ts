import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICard, IColumn } from "../types";
import { useColumnsStore } from "./ColumnStore";
import { useGameStatsStore } from "./GameStatsStore";

type UndoState = {
  columns: IColumn[];
  foundation: IColumn[];
  stock: ICard[];
};

type UndoStore = {
  previousState: UndoState | null;
  setPreviousState: () => void;
  undo: () => void;
};

export const useUndoStore = create(
  persist<UndoStore>(
    (set, get) => ({
      previousState: null,
      setPreviousState: () => {
        const { columns, foundation, stock } = useColumnsStore.getState();
        set({ previousState: { columns, foundation, stock } });
      },
      undo: () => {
        const { previousState } = get();
        if (previousState) {
          useColumnsStore.setState(previousState);
          useGameStatsStore.getState().addUndo();
          set({ previousState: null });
        }
      },
    }),
    {
      name: "solitaire-game-undo-state",
      partialize: (state) => ({ previousState: state.previousState } as any), // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  )
);
