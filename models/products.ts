import { type createProduct, type updateProduct } from '@/validators/product';
import type * as z from 'zod';

export interface Product {
  id: number;
  slug: string;
  name: string;
  desc: string;
  price: number;
  image: string;
}

export type CreateProductForm = z.infer<typeof createProduct>;

export type UpdateProductForm = z.infer<typeof updateProduct>;
