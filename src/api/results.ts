import config from "./config";
import type { Result } from "./results.types";
import { wait } from "./utilities";

/**
 * Gets all the clinical results data.
 * Result will be given after a delay (see this API config file).
 *
 * @returns A list of clinical result data.
 */
export async function getAll(): Promise<Result[]> {
  try {
    const response = await fetch(config.resultsDataPath);
    const results = (await response.json()) as Result[];
    await wait(config.responseDelay);
    return results;
  } catch (err) {
    console.error("Failed fetching all results", err);
    throw err;
  }
}
