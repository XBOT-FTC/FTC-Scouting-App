export function getRandomInteger(min: number, max: number): number {
  // Ensure that min and max are inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
