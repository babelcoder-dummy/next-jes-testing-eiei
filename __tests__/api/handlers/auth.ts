import { getUrl } from '@/__tests__/helpers/api';
import {
  createProfile,
  createProfileWithTokens,
} from '@/__tests__/models/auth';
import { type Credentials } from '@/models/auth';
import { HttpResponse, http } from 'msw';
import { type SpyOnNetwork } from './base';

export const signup = (spyOnNetwork?: SpyOnNetwork<Credentials>) => {
  return http.post<never, Credentials>(
    getUrl('/auth/sign-up'),
    async ({ request }) => {
      const body = await request.json();

      spyOnNetwork?.request?.(body);

      return HttpResponse.json(createProfile({ email: body.email }), {
        status: 201,
      });
    },
  );
};

export const signin = (spyOnNetwork?: SpyOnNetwork<Credentials>) => {
  return http.post<never, Credentials>(
    getUrl('/auth/sign-in'),
    async ({ request }) => {
      const body = await request.json();
      const profileWithTokens = createProfileWithTokens({ email: body.email });

      spyOnNetwork?.request?.(body);
      spyOnNetwork?.response?.(profileWithTokens);

      return HttpResponse.json(profileWithTokens, {
        status: 201,
      });
    },
  );
};
