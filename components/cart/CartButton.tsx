'use client';

import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/store';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const CartButton = () => {
  const totalProducts = useAppStore((state) => state.getTotalCartProducts());

  return (
    <Button variant="secondary" className="relative mr-4 rounded-full" asChild>
      <Link href="/cart">
        <ShoppingCart></ShoppingCart>
        <div className="absolute bottom-6 left-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 p-2 text-white">
          {totalProducts}
        </div>
      </Link>
    </Button>
  );
};

export default CartButton;
