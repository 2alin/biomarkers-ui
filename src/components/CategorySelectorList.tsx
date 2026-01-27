import { type ChangeEventHandler } from "react";
import OptionSelector from "./OptionSelector";
import type { CategorySelectorData } from "./CategorySelectorList.types";

interface CategorySelectorListProps {
  name: string;
  selectedCategory: string;
  selectorDataList: CategorySelectorData[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function CategorySelectorList({
  name,
  selectedCategory,
  selectorDataList,
  onChange,
}: CategorySelectorListProps) {
  return (
    <div className="flex gap-4 px-4 py-2">
      {selectorDataList.map(({ value, text }) => (
        <OptionSelector
          key={value}
          name={name}
          value={value}
          text={text}
          checked={selectedCategory === value}
          variant="primary"
          onChange={onChange}
        ></OptionSelector>
      ))}
    </div>
  );
}
