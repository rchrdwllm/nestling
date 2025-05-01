"use client";

import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface SubscriptionState {
  subscription: PushSubscription | null;
  setSubscription: (subscription: PushSubscription | null) => void;
  isSupported: boolean;
  setIsSupported: (isSupported: boolean) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscription: null,
  isSupported: false,
  setSubscription: (subscription: PushSubscription | null) =>
    set({ subscription: subscription }),
  setIsSupported: (isSupported: boolean) => set({ isSupported: isSupported }),
}));
