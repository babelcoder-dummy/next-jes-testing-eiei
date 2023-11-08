import listFilesEndsWith from '@/demo/mock/listFilesEndsWith';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
jest.mock<typeof import('fs/promises')>('fs/promises', () => {
  return {
    ...jest.requireActual('fs/promises'),
    readdir: jest
      .fn()
      .mockResolvedValue(['a.txt', 'b.txt', 'c.js', 'd.json', 'e.js']),
  };
});

describe('Auto Mock', () => {
  it('mocks fs API correctly', async () => {
    expect(await listFilesEndsWith('./', '.js')).toEqual(['c.js', 'e.js']);
  });
});
