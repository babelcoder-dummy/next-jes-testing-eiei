import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getServerImagePath } from '@/lib/image';
import { CartItem } from '@/models/cart';
import { useAppStore } from '@/store/store';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';

interface CartItemProps {
  item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const [addCartItem, removeCartItem, cartItemCount] = useAppStore(
    useShallow((state) => [
      state.addCartItem,
      state.removeCartItem,
      state.getCartItemCount(item.id),
    ]),
  );

  return (
    <Card className="my-4">
      <CardContent className="relative flex items-center gap-8 p-8">
        <Image
          priority
          src={getServerImagePath(item.image)}
          alt={item.name}
          width={100}
          height={100}
        ></Image>
        <div className="flex-1">
          <div className="flex w-full flex-col justify-between">
            <h3 className="font-bold">{item.name}</h3>
            <div className="flex items-center justify-between">
              <span>{item.price.toLocaleString()} THB</span>
              <div>
                <Button
                  variant="secondary"
                  onClick={() => removeCartItem(item.id)}
                >
                  -
                </Button>
                <span className="px-2">{cartItemCount}</span>
                <Button variant="secondary" onClick={() => addCartItem(item)}>
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
