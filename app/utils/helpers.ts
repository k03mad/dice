export const getRandomArrElem = <T>(arr: T[]): T => {
  const elem = arr[Math.floor(Math.random() * arr.length)];

  if (elem === undefined) {
    throw new Error('Array is empty');
  }

  return elem;
};
