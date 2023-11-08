import CSR from '@/demo/components/CSR';
import RSC from '@/demo/components/RSC';
import { render, screen } from '@testing-library/react';
import { products } from './api/data/products';
import server from './api/server';

describe('API', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('CSR', () => {
    it('renders UI correctly', async () => {
      render(<CSR></CSR>);

      expect(screen.getByText('Loading...')).toBeVisible();
      expect(await screen.findByRole('heading')).toHaveTextContent(
        'Product List',
      );

      const items = screen.getAllByRole('listitem');

      for (const [n, product] of Object.entries(products)) {
        expect(items[+n]).toHaveTextContent(product.name);
      }
    });
  });

  describe('RSC', () => {
    it('renders UI correctly', async () => {
      render(await RSC());

      expect(await screen.findByRole('heading')).toHaveTextContent(
        'Product List',
      );

      const items = screen.getAllByRole('listitem');

      for (const [n, product] of Object.entries(products)) {
        expect(items[+n]).toHaveTextContent(product.name);
      }
    });
  });
});
