import { setupServer } from 'msw/node';

export const setupMockServer = (...handlers: Parameters<typeof setupServer>) =>
  setupServer(...handlers);
