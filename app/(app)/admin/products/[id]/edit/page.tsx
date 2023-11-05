import EditProduct from '@/components/products/admin/EditProduct';
import AuthRouteGuard from '@/components/shell/AuthRouteGuard';

const EditProductPage = () => {
  return (
    <AuthRouteGuard roles={['ADMIN', 'MODERATOR']}>
      <EditProduct></EditProduct>
    </AuthRouteGuard>
  );
};

export default EditProductPage;
