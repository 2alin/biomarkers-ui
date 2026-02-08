import type { DetailedResult } from "../contexts/DetailedResultsContext.types";

/**
 * Filters only the latest result per biomarker in the given list
 *
 * @param detailedResults The list of detailed results to filter
 * @returns A new filter array of detailed results
 */
export function filterLatestBiomarkerResults(
  detailedResults: DetailedResult[],
): DetailedResult[] {
  const newDetailedResults: DetailedResult[] = [];

  detailedResults.forEach(({ result, biomarker }) => {
    const storedDetailedResult = newDetailedResults.find(
      ({ result: storedResult }) =>
        storedResult.biomarkerId === result.biomarkerId,
    );

    if (storedDetailedResult) {
      const storedResultTimeStamp = new Date(
        storedDetailedResult.result.sampledAt,
      ).getTime();
      const resultTimeStamp = new Date(result.sampledAt).getTime();

      if (resultTimeStamp > storedResultTimeStamp) {
        storedDetailedResult.result = structuredClone(result);
      }
    } else {
      newDetailedResults.push({
        result: structuredClone(result),
        biomarker: structuredClone(biomarker),
      });
    }
  });

  return newDetailedResults;
}
