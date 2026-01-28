import {
  useContext,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import type {
  DetailedResult,
  DetailedResultMap,
} from "../contexts/DetailedResultsContext.types";

import { ResultList } from "../components/ResultList";
import CategorySelectorList from "../components/CategorySelectorList";
import type { CategorySelectorData } from "../components/CategorySelectorList.types";
import SortSelectorList from "../components/SortSelectorList";
import type { SortType } from "../components/SortSelectorList.types";

import IconButton from "../components/IconButton";

interface ListSectionProps {
  selectedResultId: string | null;
  setSelectedResultId: Dispatch<SetStateAction<string | null>>;
}

export default function ListSection({
  selectedResultId,
  setSelectedResultId,
}: ListSectionProps) {
  const detailedResultsMap = useContext(DetailedResultsContext);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortType, setSortType] = useState<SortType>("date");
  const [isSortAscending, setIsSortAscending] = useState<boolean>(false);

  let detailedResults = detailedResultsMap
    ? [...detailedResultsMap.values()]
    : [];
  detailedResults = sortDetailedResults(detailedResults, sortType, false);

  const [filteredDetails, setFilteredDetails] =
    useState<DetailedResult[]>(detailedResults);

  if (!detailedResultsMap) {
    return;
  }

  const categorySelectorDataList =
    getCategorySelectorDataList(detailedResultsMap);

  /**
   * Handle changes on category
   *
   * @param event The "change" event being fired
   */
  function handleCategoryChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedResultId(null);

    const newSelectedCategory = event.target.value;
    setSelectedCategory(newSelectedCategory);

    if (newSelectedCategory === "all") {
      setFilteredDetails(detailedResults);
      return;
    }

    const newFilteredDetails = detailedResults.filter(({ biomarker }) => {
      if (!biomarker) {
        return false;
      }

      const category = biomarker.category.trim().toLowerCase();
      return category === newSelectedCategory;
    });

    setFilteredDetails(newFilteredDetails);
  }

  /**
   * Handle changes on sort type
   *
   * @param event The "change" event being fired
   */
  function handleSortTypeChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedResultId(null);

    const newSortType = event.target.value as SortType;

    let newFilteredDetails: DetailedResult[] = structuredClone(filteredDetails);
    let newIsSortAscending = isSortAscending;

    if (newSortType === "name") {
      // sorting by name should be ascending by default
      newIsSortAscending = true;
    } else if (newSortType === "date") {
      // sorting by date should be descending by default
      newIsSortAscending = false;
    }

    newFilteredDetails = sortDetailedResults(
      filteredDetails,
      newSortType,
      newIsSortAscending,
    );

    setFilteredDetails(newFilteredDetails);
    setSortType(newSortType);
    setIsSortAscending(newIsSortAscending);
  }

  function toggleAscending() {
    const newIsSortAscending = !isSortAscending;

    let newFilteredDetails: DetailedResult[] = structuredClone(filteredDetails);
    newFilteredDetails = sortDetailedResults(
      newFilteredDetails,
      sortType,
      newIsSortAscending,
    );

    setFilteredDetails(newFilteredDetails);
    setIsSortAscending(newIsSortAscending);
  }

  return (
    <section
      className={`flex  flex-col overflow-auto md:transition-all md:duration-300 md:ease-in-out
      ${selectedResultId ? "flex-0 md:flex-1 lg:flex-2" : "flex-1"}
    `}
    >
      <form className="flex shrink-0 overflow-auto justify-center">
        <CategorySelectorList
          name="category"
          selectedCategory={selectedCategory}
          selectorDataList={categorySelectorDataList}
          onChange={handleCategoryChange}
        ></CategorySelectorList>
      </form>

      {!filteredDetails.length ? (
        <p>No results found</p>
      ) : (
        <div className="flex flex-col overflow-auto">
          <form
            className="flex items-center justify-center my-1"
            onSubmit={(e) => e.preventDefault()}
          >
            <SortSelectorList
              name="sortType"
              selectedSortType={sortType}
              onChange={handleSortTypeChange}
            />

            <div>
              <IconButton
                label="Toggle sort order"
                iconType={isSortAscending ? "arrowUp" : "arrowDown"}
                onClick={toggleAscending}
              />
            </div>
          </form>

          <ResultList
            detailedResults={filteredDetails}
            {...{ selectedResultId, setSelectedResultId }}
          />
        </div>
      )}
    </section>
  );
}

/**
 * Gets the required data to create a list of category selectors
 *
 * @param detailedResultsMap Map with detailed data per clinical result
 * @returns A list of required data to create a category selector
 */
function getCategorySelectorDataList(
  detailedResultsMap: DetailedResultMap,
): CategorySelectorData[] {
  const categories = new Set<string>();

  detailedResultsMap.forEach(({ biomarker }) => {
    if (biomarker) {
      const category = biomarker.category.trim().toLowerCase();
      categories.add(category);
    }
  });

  // "all" categories selector should be the first in the list
  const selectorDataList: CategorySelectorData[] = [
    {
      text: "all",
      value: "all",
    },
  ];

  for (const category of categories) {
    selectorDataList.push({
      text: category,
      value: category,
    });
  }

  return selectorDataList;
}

/**
 * Sorts the given list of detailed results without mutating the original array.
 *
 * @param detailedResults The list of detailed results to sor.
 * @param sortType The type of sorting
 * @param isAscending Whether the sort should be ascending or descending
 * @returns A new sorted array of detailed results
 */
function sortDetailedResults(
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
          return 1 ;
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
