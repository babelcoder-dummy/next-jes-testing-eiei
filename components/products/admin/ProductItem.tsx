'use client';

import { useDeleteProduct } from '@/api/client/products';
import AuthActionGuard from '@/components/shell/AuthActionGuard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { type Product } from '@/models/products';
import Link from 'next/link';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const deleteProduct = useDeleteProduct(product.id);

  return (
    <TableRow>
      <TableCell className="font-medium">{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.desc.slice(0, 30)}</TableCell>
      <TableCell>{product.price.toLocaleString()}</TableCell>
      <TableCell className="text-right">
        <Button variant="outline">
          <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
        </Button>
        <Dialog>
          <AuthActionGuard roles={['ADMIN']}>
            <DialogTrigger asChild>
              <Button variant="outline" className="ml-2">
                Delete
              </Button>
            </DialogTrigger>
          </AuthActionGuard>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this product?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                product from our servers.
              </DialogDescription>
              <DialogFooter>
                <Button onClick={deleteProduct}>Delete</Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
