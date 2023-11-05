'use client';

import { register } from '@/api/client/auth';
import { type Credentials } from '@/models/auth';
import { useAppStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthForm';

const SignUp = () => {
  const router = useRouter();
  const setUiToast = useAppStore((state) => state.setUiToast);

  const onSubmit = async (credentials: Credentials) => {
    await register(credentials);
    setUiToast({
      type: 'Success',
      message: 'Your account has already been created',
    });
    router.push('/auth/sign-in');
  };

  return <AuthForm title="Sign Up" onSubmit={onSubmit}></AuthForm>;
};

export default SignUp;
