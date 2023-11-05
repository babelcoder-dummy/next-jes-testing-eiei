import { type CartItem } from '@/models/cart';
import { type Product } from '@/models/products';
import type { AppSliceCreator } from '../store';

export interface CartSlice {
  cart: {
    items: Record<Product['id'], CartItem>;
  };
  getTotalCartProducts: () => number;
  getCartItemCount: (id: Product['id']) => number;
  getTotalCartPrice: () => number;
  addCartItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeCartItem: (id: Product['id']) => void;
  clearCart: () => void;
}

export const createCartSlice: AppSliceCreator<CartSlice> = (set, get) => ({
  cart: {
    items: {},
  },
  getTotalCartProducts() {
    return Object.keys(get().cart.items).length;
  },
  getCartItemCount(id) {
    return get().cart.items[id]?.quantity ?? 0;
  },
  getTotalCartPrice() {
    return Object.values(get().cart.items).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  },
  addCartItem(item) {
    set((state) => {
      const { id } = item;
      const { items } = state.cart;

      if (id in items) state.cart.items[id].quantity += 1;
      else state.cart.items[id] = { ...item, quantity: 1 };
    });
  },
  removeCartItem(id) {
    set((state) => {
      const { items } = state.cart;

      if (!(id in items)) return;

      state.cart.items[id].quantity -= 1;

      if (items[id].quantity <= 0) delete state.cart.items[id];
    });
  },
  clearCart() {
    set((state) => {
      state.cart.items = {};
    });
  },
});
