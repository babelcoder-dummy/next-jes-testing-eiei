import type * as validators from '@/validators/auth';
import type * as z from 'zod';

export type Credentials = z.infer<typeof validators.credentials>;

export type ProfileForm = z.infer<typeof validators.profile>;

export type Role = 'MEMBER' | 'MODERATOR' | 'ADMIN';

export interface Profile {
  id: number;
  email: string;
  avatar?: string;
  name?: string;
  address?: string;
  tel?: string;
  role: Role;
}

export interface ProfileWithTokens {
  user: Profile;
  accessToken: string;
  refreshToken: string;
}
