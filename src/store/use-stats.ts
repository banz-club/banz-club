import { create } from "zustand";
import { BanStats, HistoryEntry } from "@/interfaces/bans";

interface StatsState {
  currentStats: BanStats | null;
  previousStats: BanStats | null;
  history: HistoryEntry[];
  lastFetch: number | null;
  nextFetch: number | null;
  addHistoryEntry: (entry: HistoryEntry) => void;
  setCurrentStats: (stats: BanStats) => void;
  setFetchTimes: (last: number, next: number) => void;
  clearData: () => void;
}

export const useStats = create<StatsState>((set) => ({
  currentStats: null,
  previousStats: null,
  history: [],
  lastFetch: null,
  nextFetch: null,
  addHistoryEntry: (entry) =>
    set((state) => ({
      history: [...state.history.slice(-30), entry],
    })),
  setCurrentStats: (stats) =>
    set((state) => ({
      previousStats: state.currentStats,
      currentStats: stats,
    })),
  setFetchTimes: (last, next) =>
    set(() => ({
      lastFetch: last,
      nextFetch: next,
    })),
  clearData: () =>
    set(() => ({
      currentStats: null,
      previousStats: null,
      history: [],
      lastFetch: null,
      nextFetch: null,
    })),
}));