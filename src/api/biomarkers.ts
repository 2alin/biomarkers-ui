import type { Biomarker } from "./biomarkers.types";
import config from "./config";
import { wait } from "./utilities";

/**
 * Gets all the biomarkers data.
 *
 * Result will be given after a delay (see this API config file)
 *
 * @returns A list of biomarkers data
 */
export async function getAll(): Promise<Biomarker[]> {
  try {
    const response = await fetch(config.biomarkersDataPath);
    const biomarkers = (await response.json()) as Biomarker[];
    await wait(config.responseDelay);
    return biomarkers;
  } catch (err) {
    console.error("Failed fetching all biomarkers: ", err);
    throw err;
  }
}
