"use client";

import { create } from "zustand";

type SearchState = {
  data: any[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
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
  setCurrentPage: (page: number) => void;
  searchItemClicked: boolean;
  setSearchItemClicked: (clicked: boolean) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  data: [],
  total: 0,
  currentPage: 1,
  itemsPerPage: 10,
  type: "unknown",
  setSearchResults: (results) => set({ ...results }),
  setCurrentPage: (page) => set({ currentPage: page }),
  searchItemClicked: false,
  setSearchItemClicked: (clicked) => set({ searchItemClicked: clicked }),
}));
