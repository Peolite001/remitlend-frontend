/**
 * stores/useUserStore.ts
 *
 * Zustand store for authenticated user data.
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useGamificationStore } from "./useGamificationStore";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  walletAddress?: string;
  kycVerified: boolean;
  sessionStartedAt?: string;
}

interface UserState {
  user: User | null;
  authToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface UserActions {
  setUser: (user: User) => void;
  setAuthToken: (token: string | null) => void;
  clearUser: () => void;
  updateUser: (partial: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type UserStore = UserState & UserActions;

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: UserState = {
  user: null,
  authToken: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// ─── Store ───────────────────────────────────────────────────────────────────

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setUser: (user) =>
          set(
            {
              user: { ...user, sessionStartedAt: new Date().toISOString() },
              isAuthenticated: true,
              error: null,
              isLoading: false,
            },
            false,
            "user/setUser",
          ),

        clearUser: () => set({ ...initialState }, false, "user/clearUser"),

        setAuthToken: (authToken) =>
          set({ authToken }, false, "user/setAuthToken"),

        updateUser: (partial) => {
          if (partial.kycVerified) {
            useGamificationStore.getState().addXP(30, "Profile completion");
          }
          set(
            (state) => ({
              user: state.user ? { ...state.user, ...partial } : null,
            }),
            false,
            "user/updateUser",
          );
        },

        setLoading: (isLoading) => set({ isLoading }, false, "user/setLoading"),

        setError: (error) =>
          set({ error, isLoading: false }, false, "user/setError"),
      }),
      {
        name: "remitlend-user",
        partialize: (state) => ({
          user: state.user,
          authToken: state.authToken,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    { name: "UserStore" },
  ),
);

// ─── Selectors ──────────────────────────────────────────────────────────────

export const selectUser = (state: UserStore) => state.user;
export const selectAuthToken = (state: UserStore) => state.authToken;
export const selectIsAuthenticated = (state: UserStore) =>
  state.isAuthenticated;
export const selectUserIsLoading = (state: UserStore) => state.isLoading;
export const selectUserError = (state: UserStore) => state.error;
