import { getOddNumbers } from '@/demo/mock/getOddNumbers';

describe('Mock', () => {
  it('mocks params correctly', () => {
    const mockedFn = jest
      .fn<number | null, [number]>(() => null)
      .mockImplementationOnce(() => 1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(5);

    expect(getOddNumbers(mockedFn)).toEqual([1, 3, 5]);
    expect(mockedFn).toHaveBeenCalledTimes(6);
    expect(mockedFn).toHaveBeenLastCalledWith(5);
    expect(mockedFn).toHaveBeenNthCalledWith(1, 0);
    expect(mockedFn).toHaveBeenCalledWith(1);
  });
});
