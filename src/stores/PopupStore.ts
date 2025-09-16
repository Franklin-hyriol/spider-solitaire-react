import { create } from "zustand";
import { PopupType } from "../types";

type PopupStore = {
  type: PopupType | null;
  open: (type: PopupType) => void;
  close: () => void;
};

export const usePopupStore = create<PopupStore>((set) => ({
  type: null,
  open: (type) => set({ type }),
  close: () => set({ type: null }),
}));
