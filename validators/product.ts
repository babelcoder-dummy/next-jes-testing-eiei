import * as z from 'zod';
import { image } from './image';

export const createProduct = z.object({
  name: z.string(),
  desc: z.string(),
  price: z.coerce
    .string()
    .transform((n) => parseFloat(n))
    .pipe(z.number().min(1)),
  image: image,
});

export const updateProduct = createProduct.partial();
