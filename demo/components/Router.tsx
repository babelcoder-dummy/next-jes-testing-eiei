'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Router = () => {
  const router = useRouter();

  const navigate = (to: string) => router.push(to);

  return (
    <>
      <h2 className="text-center text-4xl font-bold">Router Links</h2>
      <div className="mx-auto mt-4 flex max-w-xs flex-col space-y-4">
        <Button asChild>
          <Link href="/demo/form">Go to form</Link>
        </Button>
        <Button asChild>
          <Link href="/demo/form?type=edit">Go to with query</Link>
        </Button>
        <Button onClick={() => navigate('/demo/form')}>Navigate</Button>
      </div>
    </>
  );
};

export default Router;
