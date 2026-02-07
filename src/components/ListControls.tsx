import { useContext, type ChangeEvent } from "react";
import CategorySelectors from "./CategorySelectors";
import SortTypeSelectors from "./SortTypeSelectors";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import type { DetailedResultMap } from "../contexts/DetailedResultsContext.types";
import type { CategorySelectorData } from "./CategorySelectors.types";
import type { SortType } from "./SortTypeSelectors.types";
import SortOrderSelectors from "./SortOrderSelector";

interface ListControlsProps {
  sortType: SortType;
  handleSortTypeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isSortAscending: boolean;
  handleSortOrderChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  handleCategoryChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ListControls({
  sortType,
  handleSortTypeChange,
  isSortAscending,
  handleSortOrderChange,
  selectedCategory,
  handleCategoryChange,
}: ListControlsProps) {
  const detailedResultsMap = useContext(DetailedResultsContext);

  if (!detailedResultsMap) {
    return;
  }

  const categorySelectorDataList =
    getCategorySelectorDataList(detailedResultsMap);

  return (
    <div role="group" className="px-4 py-2 gap-1 flex flex-col">
      <form
        className="flex gap-4 overflow-x-auto sm:items-center sm:justify-end "
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
    </div>
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
