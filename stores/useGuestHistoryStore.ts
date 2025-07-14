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
  createdDate: string | null;
  addHistory: (item: GuestHistory) => void;
  resetHistory: () => void;
};

export const useGuestHistoryStore = create(
  persist<GuestHistoryState>(
    (set, get) => ({
      history: [],
      createdDate: new Date().toISOString().split("T")[0],
      addHistory: (item) => set({ history: [item, ...get().history] }),
      resetHistory: () =>
        set({
          history: [],
          createdDate: new Date().toISOString().split("T")[0],
        }),
    }),
    {
      name: "guest-history",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
