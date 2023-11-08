export const getOddNumbers = (generator: (time: number) => number | null) => {
  const nums = [];

  for (let i = 0, num = generator(i); num !== null; num = generator(++i)) {
    nums.push(num);
  }

  return nums.filter((n) => n % 2 !== 0);
};
