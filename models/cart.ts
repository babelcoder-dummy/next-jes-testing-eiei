import { type Product } from './products';

export interface CartItem
  extends Pick<Product, 'id' | 'image' | 'name' | 'price'> {
  quantity: number;
}
