export function getRandomElement<T>(array: T[]): [T, number] {
  const index = Math.floor(Math.random() * array.length);
  return [array[index], index];
}

export const delay = async (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));
