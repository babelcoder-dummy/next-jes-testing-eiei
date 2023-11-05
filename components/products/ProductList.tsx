import { type Product } from '@/models/products';
import { Separator } from '../ui/separator';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <section>
      <h2 className="text-center text-3xl font-bold uppercase">Product List</h2>
      <Separator className="my-4"></Separator>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} {...product}></ProductItem>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
