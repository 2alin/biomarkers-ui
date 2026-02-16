/**
 * Although local storage actions are synchronous, I decided to
 * define the following methods asynchronous to emulate a more realistic scenario
 */

const storageKey = "notes";

/**
 * Stores locally the notes for a specific biomarker
 *
 * @param biomarkerId The biomarker Id
 * @param value The notes to store
 */
async function set(biomarkerId: string, value: string) {
  const storedData = localStorage.getItem(storageKey);
  const notes: Record<string, string> = storedData
    ? JSON.parse(storedData)
    : {};

  const newNotes = { ...notes, [biomarkerId]: value };

  try {
    localStorage.setItem(storageKey, JSON.stringify(newNotes));
  } catch (err) {
    console.error("There was an issue while storing biomarker notes: ", err);
    throw err;
  }
}

/**
 * Retrieve the locally stored notes for a spefic biomarker
 *
 * @param biomarkerId The biomarker Id
 * @returns The stored notes
 */
async function get(biomarkerId: string): Promise<string> {
  const storedData = localStorage.getItem(storageKey);
  const notes: Record<string, string> = storedData
    ? JSON.parse(storedData)
    : {};

  return notes[biomarkerId];
}

export default { set, get };
