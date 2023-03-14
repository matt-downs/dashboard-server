export const FIFTEEN_MINUTES = 1000 * 60 * 15;
export const ONE_DAY = 1000 * 60 * 60 * 24;
export const FIVE_SECONDS = 5 * 1000;

/**
 * Ensures that cached effects are regenerated after a time period.
 */
export function effectRegenerator(timePeriod: number) {
  return Math.floor(Date.now() / timePeriod);
}
