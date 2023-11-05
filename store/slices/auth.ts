import type { AppSliceCreator } from '../store';

export interface AuthSlice {
  auth: {
    token: string | null;
    isAuthenticated: boolean;
    isLocking: boolean;
  };
  setAuth: (token: string) => void;
  clearAuth: () => void;
  setAuthLocking: (locking: boolean) => void;
}

export const createAuthSlice: AppSliceCreator<AuthSlice> = (set) => ({
  auth: {
    token: null,
    profile: null,
    isAuthenticated: false,
    isLocking: false,
  },
  setAuth(token) {
    set((state) => {
      state.auth.token = token;
      state.auth.isAuthenticated = true;
    });
  },
  clearAuth() {
    set((state) => {
      state.auth.token = null;
      state.auth.isAuthenticated = true;
    });
  },
  setAuthLocking(locking) {
    set((state) => {
      state.auth.isLocking = locking;
    });
  },
});
