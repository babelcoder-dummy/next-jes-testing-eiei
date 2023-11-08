import { useAppStore } from '@/store/store';

describe('Zustand', () => {
  it('handles global state with in the store correctly', () => {
    useAppStore.getState().addCartItem({
      id: 1,
      name: 'Taylor',
      image: 'http://taylor.swift',
      price: 1989,
    });

    expect(useAppStore.getState().cart.items).toEqual({
      1: {
        id: 1,
        name: 'Taylor',
        image: 'http://taylor.swift',
        price: 1989,
        quantity: 1,
      },
    });
  });
});
