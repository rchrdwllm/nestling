"use client";

import { create } from "zustand";

type SearchState = {
  data: any[];
  total: number;
  type:
    | "students"
    | "instructors"
    | "admins"
    | "courses"
    | "contents"
    | "projects"
    | "unknown";
  setSearchResults: (results: {
    data: any[];
    total: number;
    type: SearchState["type"];
  }) => void;
  searchItemClicked: boolean;
  setSearchItemClicked: (clicked: boolean) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  data: [],
  total: 0,
  type: "unknown",
  setSearchResults: (results) => set({ ...results }),
  searchItemClicked: false,
  setSearchItemClicked: (clicked) => set({ searchItemClicked: clicked }),
}));
