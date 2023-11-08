import {
  type Credentials,
  type Profile,
  type ProfileWithTokens,
} from '@/models/auth';
import { faker } from '@faker-js/faker';

export const createCredentials = (): Credentials => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const createProfile = (profile?: Partial<Profile>): Profile => {
  return {
    id: faker.number.int(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['MEMBER', 'MODERATOR', 'ADMIN']),
    address: faker.location.streetAddress(),
    name: faker.person.fullName(),
    tel: faker.phone.number(),
    avatar: faker.image.urlLoremFlickr(),
    ...profile,
  };
};

export const createProfileWithTokens = (
  profile?: Partial<Profile>,
): ProfileWithTokens => {
  return {
    accessToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    user: createProfile(profile),
  };
};
