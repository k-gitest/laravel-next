import { create } from 'zustand';
import type { User } from '@/types/index';

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
