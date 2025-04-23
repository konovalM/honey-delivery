import { create } from 'zustand';
import { User } from './model';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuth: boolean;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user, isAuth: !!user }),
  isAuth: false,
}));