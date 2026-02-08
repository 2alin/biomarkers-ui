import type { SortType } from "../components/SortTypeSelectors.types";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";

/**
 * Defines if by default whether a sort type should be ascending or not
 */
export const defaultAscendingByType: Record<SortType, boolean> = {
  name: true,
  anomaly: true,
};

/**
 * Sorts the given list of detailed results without mutating the original array.
 *
 * @param detailedResults The list of detailed results to sort.
 * @param sortType The type of sorting
 * @param isAscending Whether the sort should be ascending or descending
 * @returns A new sorted array of detailed results
 */
export function sortDetailedResults(
  detailedResults: DetailedResult[],
  sortType: SortType,
  isAscending: boolean,
): DetailedResult[] {
  const newDetailedResults = structuredClone(detailedResults);

  newDetailedResults.sort((a, b) => {
    const sortReturnValue = isAscending ? 1 : -1;
    const aName = (a.biomarker?.name || "").toLowerCase();
    const bName = (b.biomarker?.name || "").toLowerCase();

    const aDeviation = getRelativeDeviation(a);
    const bDeviation = getRelativeDeviation(b);

    if (sortType === "name") {
      if (bName < aName) {
        return sortReturnValue;
      } else if (aName < bName) {
        return -1 * sortReturnValue;
      } else {
        // when names are equal, let's show more 'normal' results first
        return aDeviation - bDeviation;
      }
    } else if (sortType === "anomaly") {
      if (aDeviation !== bDeviation) {
        return sortReturnValue * (aDeviation - bDeviation);
      } else {
        // when anomalies are equal, let's always sort ascendently in name
        if (bName < aName) {
          return 1;
        } else if (aName < bName) {
          return -1;
        } else {
          return 0;
        }
      }
    }

    return 0;
  });

  return newDetailedResults;
}

/**
 * Gets a relative deviation from the result value to the mean of the biomarker range
 *
 * @param detailedResult The detailed result from where to get its range deviation
 * @returns A relative deviation that is a proportion of the size of the range
 */
function getRelativeDeviation(detailedResult: DetailedResult) {
  const { result, biomarker } = detailedResult;

  if (!biomarker) {
    return Infinity;
  }

  const mean =
    (biomarker.referenceRange.high + biomarker.referenceRange.low) / 2;

  const relativeDeviation =
    Math.abs(result.value - mean) /
    (biomarker.referenceRange.high - biomarker.referenceRange.low);

  return relativeDeviation;
}
