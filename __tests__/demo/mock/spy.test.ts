import person from '@/demo/mock/person';

describe('Spy', () => {
  let spy: jest.SpyInstance;

  beforeAll(() => {
    spy = jest.spyOn(person, 'getPersonFromApi').mockReturnValue({
      id: 2,
      name: 'Taylor Swift',
      address: '222/22',
    });
  });

  afterEach(() => {
    spy.mockClear();
  });

  it('returns name correctly', () => {
    expect(person.getName()).toEqual('Taylor Swift');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('returns address correctly', () => {
    expect(person.getAddress()).toEqual('222/22');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
