"use client";

import { create } from "zustand";

interface InboxState {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string) => void;
  handleUserClick: (senderId: string, receiverId: string) => void;
}

export const useInboxStore = create<InboxState>((set, get) => ({
  selectedUserId: null,
  setSelectedUserId: (userId: string) => set({ selectedUserId: userId }),
  handleUserClick: (senderId: string, receiverId: string) => {
    set({ selectedUserId: receiverId });
  },
}));
