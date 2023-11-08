// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SpyOnNetwork<T, U = any> {
  request?: jest.Mock<void, [T]>;
  response?: jest.Mock<void, [U]>;
}
