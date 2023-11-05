import { fetchApi } from '@/api/client/api';
import {
  type Credentials,
  type Profile,
  type ProfileForm,
  type ProfileWithTokens,
} from '@/models/auth';
import { useAppStore } from '@/store/store';
import useSWR, { mutate } from 'swr';
import { useShallow } from 'zustand/react/shallow';

export const register = async (credentials: Credentials) => {
  const res = await fetchApi('/auth/sign-up', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error('Failed to register');
  return res.json() as Promise<Profile>;
};

export const login = async (credentials: Credentials) => {
  const res = await fetchApi('/auth/sign-in', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error('Failed to login');
  return res.json() as Promise<ProfileWithTokens>;
};

export const getProfile = async () => {
  const res = await fetchApi('/auth/profile');
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json() as Promise<Profile>;
};

export const updateProfile = async (profile: ProfileForm) => {
  const formData = new FormData();

  for (const name in profile) {
    const value = profile[name as keyof ProfileForm];

    if (value) formData.append(name, value);
  }

  const res = await fetchApi('/auth/profile', {
    method: 'PATCH',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json() as Promise<Profile>;
};

export const refreshToken = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh-token`,
    { method: 'POST', credentials: 'include' },
  );
  if (!res.ok) throw new Error('Failed to refresh token');
  return res.json() as Promise<ProfileWithTokens>;
};

export const logout = async () => {
  const res = await fetchApi('/auth/sign-out', { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to logout');
  return res;
};

export const clearRefreshTokenCookie = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/cookie`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to clear refresh token');
  return res;
};

export const useProfile = () => {
  const accessToken = useAppStore((state) => state.auth.token);

  return useSWR(['/auth/profile', accessToken], getProfile);
};

export const useEditProfile = () => {
  const accessToken = useAppStore((state) => state.auth.token);

  return async (profile: ProfileForm) => {
    const data = await updateProfile(profile);

    await mutate(['/auth/profile', accessToken], data);
  };
};

export const useLogout = () => {
  const [accessToken, clearAuth] = useAppStore(
    useShallow((state) => [state.auth.token, state.clearAuth]),
  );

  return async () => {
    await logout();
    await mutate(['/auth/profile', accessToken]);
    clearAuth();
  };
};
