import useFetch from '@/demo/hooks/useFetch';
import { renderHook, waitFor } from '@testing-library/react';
import { products } from '../api/data/products';
import server from '../api/server';

describe('useFetch', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('handles fetching data correctly', async () => {
    const { result } = renderHook(() => useFetch('/products'));

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.data).toEqual(null);

    await waitFor(() => {
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.data).toEqual(products);
    });
  });
});
