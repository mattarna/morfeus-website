import { create } from "zustand";

interface ContactStore {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  isOpen: false,
  openContact: () => set({ isOpen: true }),
  closeContact: () => set({ isOpen: false }),
}));

