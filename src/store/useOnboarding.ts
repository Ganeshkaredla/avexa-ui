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
export const useOnboarding = create<State & Actions>()(
  persist(
    (set) => ({
      step: 0,
      data: {},
      next: () => set((s) => ({ step: Math.min(2, (s.step + 1) as Step) })),
      prev: () => set((s) => ({ step: Math.max(0, (s.step - 1) as Step) })),
      setStep: (s) => set({ step: s }),
      update: (p) => set((s) => ({ data: { ...s.data, ...p } })),
      reset: () => set({ step: 0, data: {} }),
    }),
    { name: "onboarding" }
  )
);
