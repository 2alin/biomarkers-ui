import {
  useContext,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";

import { ResultList } from "../components/ResultList";
import type { SortType } from "../components/SortTypeSelectors.types";

import {
  defaultAscendingByType,
  sortDetailedResults,
} from "../utilities/sorting";
import ListControls from "../components/ListControls";
import type { SortOrder } from "../components/SortOrderSelectors.types";

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

  const initialSortType = "date";
  const [sortType, setSortType] = useState<SortType>(initialSortType);
  const [isSortAscending, setIsSortAscending] = useState<boolean>(
    defaultAscendingByType[initialSortType],
  );

  let detailedResults = detailedResultsMap
    ? [...detailedResultsMap.values()]
    : [];
  detailedResults = sortDetailedResults(
    detailedResults,
    sortType,
    isSortAscending,
  );
  const [filteredDetails, setFilteredDetails] =
    useState<DetailedResult[]>(detailedResults);

  if (!detailedResultsMap) {
    return;
  }

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
    const newIsSortAscending = defaultAscendingByType[newSortType];

    newFilteredDetails = sortDetailedResults(
      filteredDetails,
      newSortType,
      newIsSortAscending,
    );

    setFilteredDetails(newFilteredDetails);
    setSortType(newSortType);
    setIsSortAscending(newIsSortAscending);
  }

  /**
   * Handle changes on sort order type
   */
  function handleSortOrderChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedSortOrder = event.target.value as SortOrder;
    const newIsSortAscending = selectedSortOrder === "ascendent";

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
      className={`flex overflow-auto  flex-col md:transition-all md:duration-300 md:ease-in-out
      ${selectedResultId ? "flex-0 md:flex-1 lg:flex-2" : "flex-1"}
    `}
    >
      <ListControls
        {...{
          sortType,
          handleSortTypeChange,
          isSortAscending,
          handleSortOrderChange,
          selectedCategory,
          handleCategoryChange,
        }}
      />

      {!filteredDetails.length ? (
        <p className="text-center p-4 font-bold text-secondary-800">
          No filtered results found
        </p>
      ) : (
        <div className="flex flex-col overflow-auto">
          <ResultList
            detailedResults={filteredDetails}
            {...{ selectedResultId, setSelectedResultId }}
          />
        </div>
      )}
    </section>
  );
}
