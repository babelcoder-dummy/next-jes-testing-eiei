import ProductList from '@/components/products/admin/ProductList';
import AuthRouteGuard from '@/components/shell/AuthRouteGuard';

const ProductsPage = () => {
  return (
    <AuthRouteGuard roles={['ADMIN', 'MODERATOR']}>
      <ProductList></ProductList>
    </AuthRouteGuard>
  );
};

export default ProductsPage;
