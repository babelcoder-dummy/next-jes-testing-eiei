import {
  type CreateProductForm,
  type Product,
  type UpdateProductForm,
} from '@/models/products';
import { useAppStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import { getProduct, getProducts } from '../products';
import { fetchApi } from './api';

export const updateProduct = async (
  id: Product['id'],
  product: UpdateProductForm,
) => {
  const formData = new FormData();

  for (const name in product) {
    const value = product[name as keyof UpdateProductForm];

    if (value) {
      formData.append(name, typeof value === 'number' ? `${value}` : value);
    }
  }

  const res = await fetchApi(`/products/${id}`, {
    method: 'PATCH',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to update product');
  return res.json() as Promise<Product>;
};

export const createProduct = async (product: CreateProductForm) => {
  const formData = new FormData();

  for (const name in product) {
    const value = product[name as keyof CreateProductForm];

    if (value) {
      formData.append(name, typeof value === 'number' ? `${value}` : value);
    }
  }

  const res = await fetchApi('/products', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to create product');
  return res.json() as Promise<Product>;
};

export const deleteProduct = (id: number) => {
  return fetchApi(`/products/${id}`, { method: 'DELETE' });
};

export const useGetProducts = () => {
  return useSWR('/products', getProducts);
};

export const useGetProduct = (id: Product['id']) => {
  return useSWR(`/products/${id}`, () => getProduct(id));
};

export const useUpdateProduct =
  (id: Product['id']) => async (product: UpdateProductForm) => {
    const editedProduct = await updateProduct(id, product);

    await mutate('/products');
    await mutate(`/products/${id}`, editedProduct);
  };

export const useCreateProduct = () => async (product: CreateProductForm) => {
  await createProduct(product);
  await mutate('/products');
};

export const useDeleteProduct = (id: number) => {
  const router = useRouter();
  const setUiToast = useAppStore((state) => state.setUiToast);

  return async () => {
    await deleteProduct(id);
    await mutate('/products');
    setUiToast({
      type: 'Success',
      message: 'The product has already been deleted',
    });
    router.push('/admin/products');
  };
};
