// interface Product {
//   id: number;
//   name: string;
// }

import { useCallback, useEffect, useState } from 'react';

// const { isLoading, data } = useFetch<Product[]>('/products')

const useFetch = <T>(path: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/v1${path}`;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(async () => {
    const res = await fetch(url);
    const data = (await res.json()) as T;

    setData(data);
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { isLoading, data };
};

export default useFetch;
