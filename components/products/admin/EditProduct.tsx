'use client';

import { useGetProduct, useUpdateProduct } from '@/api/client/products';
import { type UpdateProductForm } from '@/models/products';
import { useAppStore } from '@/store/store';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from './ProductForm';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isLoading } = useGetProduct(+id);
  const editProduct = useUpdateProduct(+id);
  const setUiToast = useAppStore((state) => state.setUiToast);

  const onSubmit = async (product: UpdateProductForm) => {
    await editProduct(product);
    setUiToast({
      type: 'Success',
      message: 'The product has already been updated',
    });
    router.push('/admin/products');
  };

  if (isLoading) return <div>Loading....</div>;
  if (!product) return <div>No product found</div>;

  return (
    <ProductForm
      kind="edit"
      product={product}
      onSubmit={onSubmit}
    ></ProductForm>
  );
};

export default EditProduct;
