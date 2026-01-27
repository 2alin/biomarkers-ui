import type { Biomarker } from "./biomarkers.types";
import config from "./config";
import { wait } from "./utilities";

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
