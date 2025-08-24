"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
  q: string;
  status: "all" | "draft" | "submitted" | "approved" | "rejected";
  page: number;
  pageSize: number;
};
type Actions = {
  setQ: (q: string) => void;
  setStatus: (s: State["status"]) => void;
  setPage: (p: number) => void;
  setPageSize: (n: number) => void;
};
export const useCustomerTable = create<State & Actions>()(
  persist(
    (set) => ({
      q: "",
      status: "all",
      page: 0,
      pageSize: 10,
      setQ: (q) => set({ q, page: 0 }),
      setStatus: (status) => set({ status, page: 0 }),
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize, page: 0 }),
    }),
    { name: "customers-table" }
  )
);
