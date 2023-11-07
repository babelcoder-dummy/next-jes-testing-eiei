describe('Jest', () => {
  describe('Matchers', () => {
    describe('Truthniness', () => {
      it('evaluates value correctly', () => {
        const n = null;

        expect(n).toBeNull();
        expect(n).toBeDefined();
        expect(n).not.toBeTruthy();
        expect(n).toBeFalsy();

        const m = undefined;

        expect(m).toBeUndefined();
        expect(m).not.toBeDefined();
        expect(m).not.toBeTruthy();
        expect(m).toBeFalsy();

        const x = 0;

        expect(x).not.toBeUndefined();
        expect(x).toBeDefined();
        expect(x).not.toBeTruthy();
        expect(x).toBeFalsy();

        const y = 1;

        expect(y).not.toBeUndefined();
        expect(y).toBeDefined();
        expect(y).toBeTruthy();
        expect(y).not.toBeFalsy();
      });
    });
    describe('Number', () => {
      it('checks number correcly', () => {
        const value = 2 + 3;

        expect(value).toBe(5);
        expect(value).toEqual(5);
        expect(value).toBeGreaterThan(1);
        expect(value).toBeGreaterThanOrEqual(4);
        expect(value).toBeLessThan(9);
        expect(value).toBeLessThanOrEqual(10);
        expect(0.1 + 0.2).toBeCloseTo(0.3);
      });
    });
    describe('String', () => {
      it('checks text correctly', () => {
        const str = 'hello';

        expect(str).toBe('hello');
        expect(str).toEqual('hello');
        expect(str).toMatch(/llo$/);
        expect(str).toHaveLength(5);
      });
    });
    describe('Arrays', () => {
      it('checks array correctly', () => {
        const reactLangs = ['tsx', 'jsx'];
        const programmingLangs = [
          'JavaScript',
          'Python',
          'C/C++',
          'Java',
          'R',
          reactLangs,
        ];

        expect(programmingLangs).toContain('R');
        expect(programmingLangs).toHaveLength(6);
        expect(programmingLangs).not.toContain(['tsx', 'jsx']);
        expect(programmingLangs).toContainEqual(['tsx', 'jsx']);
      });
    });
    describe('Object', () => {
      it('checks object correctly', () => {
        const person = {
          name: 'Somchai',
          age: 24,
          socials: {
            line: 'somchai',
            facebook: 'somchai',
          },
        };
        const person2 = {
          name: 'Somchai',
          age: 24,
          socials: {
            line: 'somchai',
            facebook: 'somchai',
          },
        };
        const partial = {
          name: 'Somchai',
          socials: {
            line: 'somchai',
          },
        };

        expect(person).toMatchObject(partial);
        expect(person).not.toBe(person2);
        expect(person).toEqual(person2);
        expect(person).toHaveProperty('name');
        expect(person).toHaveProperty('name', 'Somchai');
      });
    });
    describe('Exception', () => {
      it('checks exception correctly', () => {
        class MyErr extends Error {
          constructor(message: string) {
            super(message);
          }
        }

        const withEx = () => {
          throw new MyErr('My Error');
        };

        expect(withEx).toThrow();
        expect(withEx).toThrow(MyErr);
        expect(withEx).toThrow('My Error');
        expect(withEx).toThrow(/my error/i);
      });
    });
  });
  describe('Setup and Teardown', () => {
    beforeAll(() => console.log('1 - beforeAll'));
    afterAll(() => console.log('1 - afterAll'));
    beforeEach(() => console.log('1 - beforeEach'));
    afterEach(() => console.log('1 - afterEach'));
    it('', () => console.log('1 - test'));
    describe('Scoped / Nested block', () => {
      beforeAll(() => console.log('2 - beforeAll'));
      afterAll(() => console.log('2 - afterAll'));
      beforeEach(() => console.log('2 - beforeEach'));
      afterEach(() => console.log('2 - afterEach'));
      it('', () => console.log('2 - test'));
    });
  });
});
