import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GuestHistory = {
  task: string;
  description: string;
  start: Date | null;
  end: Date;
  duration: number;
};

type GuestHistoryState = {
  history: GuestHistory[];
  addHistory: (item: GuestHistory) => void;
};

export const useGuestHistoryStore = create(
  persist<GuestHistoryState>(
    (set, get) => ({
      history: [],
      isLoading: true,
      addHistory: (item) => set({ history: [item, ...get().history] }),
    }),
    {
      name: "guest-history",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
