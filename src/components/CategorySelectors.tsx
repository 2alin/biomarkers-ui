import { useContext, type ChangeEventHandler } from "react";
import OptionSelector from "./OptionSelector";
import type { CategorySelectorData } from "./CategorySelectors.types";
import { InitialResultsContext } from "../contexts/InitialResultsContext";

interface CategorySelectorsProps {
  name: string;
  selectedCategory: string;
  selectorDataList: CategorySelectorData[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function CategorySelectors({
  name,
  selectedCategory,
  selectorDataList,
  onChange,
}: CategorySelectorsProps) {
  const initialFilteredDetails = useContext(InitialResultsContext);

  function getAmountInCategory(categoryName: string) {
    const categoryNameToCompare = categoryName.trim().toLowerCase();

    if (categoryNameToCompare === "all") {
      return initialFilteredDetails.length;
    }

    const resultsInCategory = initialFilteredDetails.filter(({ biomarker }) => {
      if (!biomarker) {
        return false;
      }

      return biomarker.category.trim().toLowerCase() === categoryNameToCompare;
    });

    return resultsInCategory.length;
  }

  return (
    <div className="flex gap-3 p-1 overflow-auto">
      {selectorDataList.map(({ value, text }) => (
        <OptionSelector
          key={value}
          name={name}
          value={value}
          text={text}
          checked={selectedCategory === value}
          badgeText={getAmountInCategory(value).toString()}
          onChange={onChange}
        ></OptionSelector>
      ))}
    </div>
  );
}
