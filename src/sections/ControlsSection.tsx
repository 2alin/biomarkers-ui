import {
  useContext,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import CategorySelectors from "../components/CategorySelectors";
import SortTypeSelectors from "../components/SortTypeSelectors";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";
import type { CategorySelectorData } from "../components/CategorySelectors.types";
import type { SortType } from "../components/SortTypeSelectors.types";
import SortOrderSelectors from "../components/SortOrderSelector";
import {
  defaultAscendingByType,
  sortDetailedResults,
} from "../utilities/sorting";
import type { SortOrder } from "../components/SortOrderSelectors.types";
import { InitialResultsContext } from "../contexts/InitialResultsContext";

interface ControlsSectionProps {
  initialSortType: SortType;
  filteredDetails: DetailedResult[];
  setFilteredDetails: Dispatch<SetStateAction<DetailedResult[]>>;
  setSelectedResultId: Dispatch<SetStateAction<string | null>>;
}

export default function ControlsSection({
  initialSortType,
  filteredDetails,
  setFilteredDetails,
  setSelectedResultId,
}: ControlsSectionProps) {
  const detailedResultsMap = useContext(DetailedResultsContext);
  const initialFilteredDetails = useContext(InitialResultsContext);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortType, setSortType] = useState<SortType>(initialSortType);
  const [isSortAscending, setIsSortAscending] = useState<boolean>(
    defaultAscendingByType[initialSortType],
  );

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
      setFilteredDetails(initialFilteredDetails);
      return;
    }

    const newFilteredDetails = initialFilteredDetails.filter(
      ({ biomarker }) => {
        if (!biomarker) {
          return false;
        }

        const category = biomarker.category.trim().toLowerCase();
        return category === newSelectedCategory;
      },
    );

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

  if (!detailedResultsMap) {
    return;
  }

  const categorySelectorDataList = getCategorySelectorDataList(
    initialFilteredDetails,
  );

  return (
    <section className="px-4 py-2 gap-1 flex flex-col 3xl:flex-row-reverse 3xl:justify-center 3xl:gap-4 ">
      <form
        className="flex gap-4 overflow-x-auto sm:items-center sm:justify-end"
        onSubmit={(e) => e.preventDefault()}
      >
        <SortTypeSelectors
          name="sortType"
          selectedSortType={sortType}
          onChange={handleSortTypeChange}
        />

        <SortOrderSelectors
          name="sortOrder"
          isSortAscending={isSortAscending}
          onChange={handleSortOrderChange}
        />
      </form>
      <form className="flex shrink-0 overflow-auto justify-center">
        <CategorySelectors
          name="category"
          selectedCategory={selectedCategory}
          selectorDataList={categorySelectorDataList}
          onChange={handleCategoryChange}
        ></CategorySelectors>
      </form>
    </section>
  );
}

/**
 * Gets the required data to create a list of category selectors
 *
 * @param filteredDetails Array with detailed data per clinical result
 * @returns A list of required data to create a category selector
 */
function getCategorySelectorDataList(
  filteredDetails: DetailedResult[],
): CategorySelectorData[] {
  const categories = new Set<string>();

  filteredDetails.forEach(({ biomarker }) => {
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
