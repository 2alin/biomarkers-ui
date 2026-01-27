/**
 * Utility function to add a delay by the milliseconds given
 *
 * @param ms Milliseconds to wait
 * @returns A promise that will be resolved after the given milliseconds
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
