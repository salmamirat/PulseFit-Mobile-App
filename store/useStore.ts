import { create } from "zustand";

export interface Session {
  id: string;
  distance: number;
  duration: number;
  speed: number;
  date: string;
}

interface AppStore {
  steps: number;
  dailyGoal: number;
  profileImage: string | null;
  sessions: Session[];

  setSteps: (steps: number) => void;
  setProfileImage: (uri: string) => void;
  addSession: (session: Session) => void;
  deleteSession: (id: string) => void;
}

export const useStore = create<AppStore>((set) => ({
  steps: 0,
  dailyGoal: 10000,
  profileImage: null,
  sessions: [],

  setSteps: (steps) => set({ steps }),
  setProfileImage: (uri) => set({ profileImage: uri }),

  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session],
    })),

  deleteSession: (id) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id),
    })),
}));