'use client';

import { useProfile } from '@/api/client/auth';
import { type Role } from '@/models/auth';
import { useAppStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { useShallow } from 'zustand/react/shallow';

interface UserAuthActionGuardParams {
  roles?: Role[];
  children: ReactNode;
}

const AuthActionGuard = (params: UserAuthActionGuardParams) => {
  const router = useRouter();
  const { data: profile } = useProfile();
  const [isAuthenticated, setUiToast] = useAppStore(
    useShallow((state) => [state.auth.isAuthenticated, state.setUiToast]),
  );
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!profile) return;

    if (params?.roles && !params?.roles.includes(profile.role)) return;

    setIsAllowed(true);
  }, [isAuthenticated, params?.roles, profile, router, setUiToast]);

  if (!isAuthenticated) return <div>Loading...</div>;
  if (!isAllowed) return;

  return <>{params.children}</>;
};

export default AuthActionGuard;
