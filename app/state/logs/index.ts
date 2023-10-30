import { LogState } from "@/app/types/state";
import { create } from "zustand";

export const useLogs = create<LogState>((set) => ({
  id: "",
  title: "",
  action: "",
  date: "",
  tagId: "",
  setId: (value: string) => {
    set(() => ({ id: value }));
  },
  setTitle: (value: string) => {
    set(() => ({ title: value }));
  },
  setAction: (value: string) => {
    set(() => ({ action: value }));
  },
  setDate: (value: Date | string) => {
    set(() => ({ date: value }));
  },
  setTagId: (value: string) => {
    set(() => ({ tagId: value }));
  },
}));
