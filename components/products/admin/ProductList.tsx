'use client';

import { useGetProducts } from '@/api/client/products';
import AuthActionGuard from '@/components/shell/AuthActionGuard';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <div>Loading...</div>;
  if (!products) return <div>No products found</div>;

  return (
    <>
      <header className="flex justify-between border-b pb-4">
        <h2 className="text-center text-3xl font-bold">Product List</h2>
        <AuthActionGuard roles={['ADMIN', 'MODERATOR']}>
          <Button asChild>
            <Link href="/admin/products/new">Create</Link>
          </Button>
        </AuthActionGuard>
      </header>
      <Table>
        <TableCaption>A list of all products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Desc</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductItem key={product.id} product={product}></ProductItem>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductList;
