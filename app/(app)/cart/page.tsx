import Cart from '@/components/cart/Cart';
import AuthRouteGuard from '@/components/shell/AuthRouteGuard';

const CartPage = () => {
  return (
    <AuthRouteGuard>
      <Cart></Cart>
    </AuthRouteGuard>
  );
};

export default CartPage;
