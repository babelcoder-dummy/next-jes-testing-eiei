'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import CartItem from './CartItem';

const Cart = () => {
  const router = useRouter();
  const [items, totalCartPrice, clearCart, setUiToast] = useAppStore(
    useShallow((state) => [
      state.cart.items,
      state.getTotalCartPrice(),
      state.clearCart,
      state.setUiToast,
    ]),
  );

  const pay = () => {
    clearCart();
    setUiToast({ type: 'Success', message: 'Your payment was successful' });
    router.push('/products');
  };

  return (
    <section className="mx-auto max-w-lg">
      <h2 className="text-center text-3xl font-bold">Cart Items</h2>
      {Object.entries(items).map(([id, item]) => (
        <CartItem key={id} item={item}></CartItem>
      ))}
      <Separator className="my-4" />
      <footer className="flex items-center justify-between">
        <p className="text-4xl font-bold">
          {totalCartPrice.toLocaleString()} THB
        </p>
        <Button onClick={pay}>Pay</Button>
      </footer>
    </section>
  );
};

export default Cart;
