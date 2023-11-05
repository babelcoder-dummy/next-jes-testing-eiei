'use client';

import UnauthorizedError from '@/api/errors/unauthorized';
import { type ReactNode } from 'react';
import { SWRConfig } from 'swr';
import Header from './Header';
import Toast from './Toast';

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <SWRConfig
      value={{
        onErrorRetry(err) {
          if (err instanceof UnauthorizedError) return;
        },
      }}
    >
      <Header></Header>
      <main className="container mx-auto my-4">
        {children}
        <Toast />
      </main>
    </SWRConfig>
  );
};

export default Content;
