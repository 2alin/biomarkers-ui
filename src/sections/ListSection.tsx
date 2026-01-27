import { useContext, useState, type ChangeEvent } from "react";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import type {
  DetailedResultMap,
} from "../contexts/DetailedResultsContext.types";
import type { CategorySelectorData } from "../components/CategorySelectorList.types";
import CategorySelectorList from "../components/CategorySelectorList";

export default function ListSection() {
  const detailedResultsMap = useContext(DetailedResultsContext);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  if (!detailedResultsMap) {
    return;
  }

  const categorySelectorDataList =
    getCategorySelectorDataList(detailedResultsMap);

  function handleCategoryChange(event: ChangeEvent<HTMLInputElement>) {
    const newSelectedCategory = event.target.value;
    setSelectedCategory(newSelectedCategory);
  }

  return (
    <section>
      <form className="shrink-0 overflow-auto">
        <CategorySelectorList
          name="category"
          selectedCategory={selectedCategory}
          selectorDataList={categorySelectorDataList}
          onChange={handleCategoryChange}
        ></CategorySelectorList>
      </form>
      <p>List Section</p>
      <p>Category Selected: {selectedCategory}</p>
    </section>
  );
}

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
