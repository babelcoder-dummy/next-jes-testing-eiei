import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createAuthSlice, type AuthSlice } from './slices/auth';
import { createCartSlice, type CartSlice } from './slices/cart';
import { createShellSlice, type ShellSlice } from './slices/shell';

export type AppState = CartSlice & AuthSlice & ShellSlice;

export type AppSliceCreator<T> = StateCreator<
  AppState,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  T
>;

export const useAppStore = create<AppState>()(
  immer(
    devtools((...a) => ({
      ...createCartSlice(...a),
      ...createAuthSlice(...a),
      ...createShellSlice(...a),
    })),
  ),
);
