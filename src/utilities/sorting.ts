import type { SortType } from "../components/SortTypeSelectors.types";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";

/**
 * Defines if by default whether a sort type should be ascending or not
 */
export const defaultAscendingByType: Record<SortType, boolean> = {
  date: false,
  name: true,
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
    const aTimeStamp = new Date(a.result.sampledAt).getTime();
    const bTimeStamp = new Date(b.result.sampledAt).getTime();

    if (sortType === "name") {
      if (bName < aName) {
        return sortReturnValue;
      } else if (aName < bName) {
        return -1 * sortReturnValue;
      } else {
        // when names are equal, let's always sort from new to old date
        return bTimeStamp - aTimeStamp;
      }
    } else if (sortType === "date") {
      if (bTimeStamp !== aTimeStamp) {
        return sortReturnValue * (aTimeStamp - bTimeStamp);
      } else {
        // when dates are equal, let's always sort ascendently in name
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
