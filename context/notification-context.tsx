"use client";

import { Notification } from "@/types";
import { create } from "zustand";

interface NotificationState {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));
