import { getProducts } from '@/api/products';

const RSC = async () => {
  const products = await getProducts();

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

export default RSC;
