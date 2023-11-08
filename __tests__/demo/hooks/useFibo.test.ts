import useFibo from '@/demo/hooks/useFibo';
import { act, renderHook } from '@testing-library/react';

describe('useFibo', () => {
  it('calculates fibonacci sequence correctly', () => {
    const seq = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
    const { result } = renderHook(() => useFibo());

    expect(result.current.current).toBe(0);
    act(() => {
      result.current.next();
    });
    expect(result.current.current).toBe(1);

    for (const n of seq) {
      act(() => {
        result.current.next();
      });
      expect(result.current.current).toBe(n);
    }
  });
});
