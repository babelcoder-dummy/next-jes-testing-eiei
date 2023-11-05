import * as z from 'zod';
import { image } from './image';

export const credentials = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const profile = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  address: z.string().optional(),
  tel: z
    .string()
    .regex(/\d{3}-\d{3}-\d{4}/)
    .optional()
    .or(z.literal('')),
  avatar: image.optional(),
});
