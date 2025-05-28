"use client";

import { create } from "zustand";

interface ProjectsTimelineState {
  formToggled: boolean;
  setFormToggled: (toggled: boolean) => void;
  selectedStartDate: Date;
  setSelectedStartDate: (date: Date) => void;
  selectedEndDate: Date;
  setSelectedEndDate: (date: Date) => void;
}

export const useProjectsTimelineStore = create<ProjectsTimelineState>(
  (set, get) => ({
    formToggled: false,
    setFormToggled: (toggled: boolean) => set({ formToggled: toggled }),
    selectedStartDate: new Date(),
    setSelectedStartDate: (date: Date) => set({ selectedStartDate: date }),
    selectedEndDate: new Date(),
    setSelectedEndDate: (date: Date) => set({ selectedEndDate: date }),
  })
);
