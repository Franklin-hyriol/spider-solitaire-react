import { create } from "zustand";
import type { ICard } from "../types";

interface DragStore {
  draggedStack: ICard[] | null;
  draggedCardIds: Set<string>; // Pour une recherche O(1)
  isValidDrag: boolean;
  setDraggedStack: (stack: ICard[] | null) => void;
  setIsValidDrag: (isValid: boolean) => void;
}

export const useDragStore = create<DragStore>((set) => ({
  draggedStack: null,
  draggedCardIds: new Set(),
  isValidDrag: false,
  setDraggedStack: (stack) => {
    const newIds = new Set(stack?.map((c) => c.id) ?? []);
    set({ draggedStack: stack, draggedCardIds: newIds });
  },
  setIsValidDrag: (isValid) => set({ isValidDrag: isValid }),
}));
