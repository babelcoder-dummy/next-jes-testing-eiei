import { fetchApi } from '@/api/api';
import { type Product } from '@/models/products';

export const getProducts = async () => {
  const res = await fetchApi('/products', { next: { revalidate: 300 } });

  if (!res.ok) throw new Error('Failed to fetch product list');
  return res.json() as Promise<Product[]>;
};

export const getProduct = async (id: number) => {
  const res = await fetchApi(`/products/${id}`, { next: { revalidate: 300 } });

  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json() as Promise<Product>;
};
