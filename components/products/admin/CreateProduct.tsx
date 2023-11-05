'use client';

import { useCreateProduct } from '@/api/client/products';
import { type CreateProductForm } from '@/models/products';
import { useAppStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import ProductForm from './ProductForm';

const CreateProduct = () => {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const setUiToast = useAppStore((state) => state.setUiToast);

  const onSubmit = async (product: CreateProductForm) => {
    await createProduct(product);
    setUiToast({
      type: 'Success',
      message: 'The product has already been created',
    });
    router.push('/admin/products');
  };

  return <ProductForm kind="create" onSubmit={onSubmit}></ProductForm>;
};

export default CreateProduct;
