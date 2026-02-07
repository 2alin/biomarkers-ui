import { type ChangeEventHandler } from "react";
import OptionSelector from "./OptionSelector";
import type { CategorySelectorData } from "./CategorySelectors.types";

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
  return (
    <div className="flex gap-4 p-1 overflow-auto">
      {selectorDataList.map(({ value, text }) => (
        <OptionSelector
          key={value}
          name={name}
          value={value}
          text={text}
          checked={selectedCategory === value}
          onChange={onChange}
        ></OptionSelector>
      ))}
    </div>
  );
}
