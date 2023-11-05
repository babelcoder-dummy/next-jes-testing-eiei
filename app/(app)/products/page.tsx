import { getProducts } from '@/api/products';
import ProductList from '@/components/products/ProductList';

const ProductsPage = async () => {
  const products = await getProducts();

  return <ProductList products={products}></ProductList>;
};

export default ProductsPage;
