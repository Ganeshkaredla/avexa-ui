"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Step = 0 | 1 | 2;

type State = {
  step: Step;
  data: {
    name?: string;
    email?: string;
    phone?: string;
    dob?: string;
    documentId?: string;
    profile?: { address?: string; notes?: string };
  };
};

type Actions = {
  next: () => void;
  prev: () => void;
  setStep: (s: Step) => void;
  update: (p: Partial<State["data"]>) => void;
  reset: () => void;
};

type Store = State & Actions;

const clampStep = (n: number): Step => (n <= 0 ? 0 : n >= 2 ? 2 : (n as Step));

export const useOnboarding = create<Store>()(
  persist<Store>(
    (set, get) => ({
      step: 0,
      data: {},

      next: () => set((s) => ({ step: clampStep(s.step + 1) })),

      prev: () => set((s) => ({ step: clampStep(s.step - 1) })),

      setStep: (s) => set({ step: s }),

      update: (p) => set((s) => ({ data: { ...s.data, ...p } })),

      reset: () => set({ step: 0 as Step, data: {} }),
    }),
    { name: "onboarding" }
  )
);
