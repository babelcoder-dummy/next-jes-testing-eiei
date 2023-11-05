import CreateProduct from '@/components/products/admin/CreateProduct';
import AuthRouteGuard from '@/components/shell/AuthRouteGuard';

const CreateProductPage = () => {
  return (
    <AuthRouteGuard roles={['ADMIN', 'MODERATOR']}>
      <CreateProduct></CreateProduct>
    </AuthRouteGuard>
  );
};

export default CreateProductPage;
