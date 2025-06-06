"use client";

import { create } from "zustand";

interface InboxState {
  notifCount: number;
  incrementNotifCount: () => void;
  resetNotifCount: () => void;
  setNotifCount: (count: number) => void;
}

export const useNotifCountStore = create<InboxState>((set, get) => ({
  notifCount: 0,
  incrementNotifCount: () =>
    set((state) => ({ notifCount: state.notifCount + 1 })),
  resetNotifCount: () => set({ notifCount: 0 }),
  setNotifCount: (count: number) => set({ notifCount: count }),
}));
