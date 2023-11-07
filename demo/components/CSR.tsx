'use client';

import { useGetProducts } from '@/api/client/products';

const CSR = () => {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <div>Loading...</div>;
  if (!products) return <div>No products found</div>;
  return (
    <>
      <h2 className="text-center text-4xl font-bold">Product List</h2>
      <ul className="mx-auto mt-4 max-w-md">
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
};

export default CSR;
