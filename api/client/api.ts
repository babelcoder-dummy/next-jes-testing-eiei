import { clearRefreshTokenCookie, refreshToken } from '@/api/client/auth';
import { useAppStore } from '@/store/store';
import { Mutex } from 'async-mutex';
import { mutate } from 'swr';
import UnauthorizedError from '../errors/unauthorized';

const mutex = new Mutex();

const fetchWithErrorHandler = async (
  info: RequestInfo | URL,
  init?: RequestInit | undefined,
) => {
  await mutex.waitForUnlock();
  const response = await fetch(info, init);
  const state = useAppStore.getState();

  if (response.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const { accessToken, user } = await refreshToken();
        state.setAuth(accessToken);
        await mutate(['/auth/profile', accessToken], user);
      } catch {
        void clearRefreshTokenCookie();
        state.clearAuth();
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
    }

    throw new UnauthorizedError();
  } else if (response.status === 403) {
    state.setUiToast({
      type: 'Error',
      message: 'You are not allowed to access this page',
    });
  }

  return response;
};

export const fetchApi = (...[info, init]: Parameters<typeof fetch>) => {
  const accessToken = useAppStore.getState().auth.token;
  const initWithCredentials = (
    accessToken
      ? {
          ...init,
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
        }
      : { ...init, credentials: 'include' }
  ) as RequestInit;

  if (typeof info !== 'string') {
    return fetchWithErrorHandler(info as URL, initWithCredentials);
  }

  const target = info.startsWith('/') ? info : `/${info}`;

  return fetchWithErrorHandler(
    `${process.env.NEXT_PUBLIC_API_URL}/v1${target}`,
    initWithCredentials,
  );
};
