'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getServerImagePath } from '@/lib/image';
import { type Product } from '@/models/products';
import { useAppStore } from '@/store/store';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '../ui/button';

const ProductItem = (props: Product) => {
  const { id, image, name, desc, price } = props;
  const [addCartItem, removeCartItem, cartItemCount] = useAppStore(
    useShallow((state) => [
      state.addCartItem,
      state.removeCartItem,
      state.getCartItemCount(id),
    ]),
  );

  return (
    <Card>
      <div className="relative h-40">
        <Image
          priority
          src={getServerImagePath(image)}
          alt={name}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          className="object-cover"
        ></Image>
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{desc.slice(0, 20)}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full items-center justify-between">
          <span>{price.toLocaleString()} THB</span>
          <div className="flex items-center">
            <Button variant="secondary" onClick={() => removeCartItem(id)}>
              -
            </Button>
            <span className="px-2">{cartItemCount}</span>
            <Button variant="secondary" onClick={() => addCartItem(props)}>
              +
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
