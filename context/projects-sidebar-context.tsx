"use client";

import { create } from "zustand";

interface ProjectsSidebarState {
  isToggled: boolean;
  setIsToggled: (value: boolean) => void;
}

export const useProjectsSidebarStore = create<ProjectsSidebarState>((set) => ({
  isToggled: true,
  setIsToggled: (value: boolean) => set({ isToggled: value }),
}));
