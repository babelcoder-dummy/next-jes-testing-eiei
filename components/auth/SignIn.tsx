'use client';

import * as api from '@/api/client/auth';
import { type Credentials } from '@/models/auth';
import { useAppStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import AuthForm from './AuthForm';

const SignIn = () => {
  const router = useRouter();
  const setAuth = useAppStore((state) => state.setAuth);
  const login = async (credentials: Credentials) => {
    const { accessToken, user } = await api.login(credentials);

    setAuth(accessToken);
    await mutate(['/auth/profile', accessToken], user);
    router.push('/products');
  };

  return <AuthForm title="Sign In" onSubmit={login}></AuthForm>;
};

export default SignIn;
