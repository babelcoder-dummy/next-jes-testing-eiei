import type { AppSliceCreator } from '../store';

export interface ShellSlice {
  shell: {
    toast: {
      type: 'Success' | 'Error';
      message: string;
    } | null;
  };
  setUiToast: (toast: ShellSlice['shell']['toast']) => void;
  clearToast: () => void;
}

export const createShellSlice: AppSliceCreator<ShellSlice> = (set, get) => ({
  shell: {
    toast: null,
  },
  setUiToast: (toast) => {
    set((state) => {
      state.shell.toast = toast;
    });

    setTimeout(() => {
      get().clearToast();
    }, 3_000);
  },
  clearToast: () =>
    set((state) => {
      state.shell.toast = null;
    }),
});
