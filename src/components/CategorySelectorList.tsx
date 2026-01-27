import { type ChangeEventHandler } from "react";
import CategorySelector from "./CategorySelector";
import type { CategorySelectorData } from "./CategorySelectorList.types";

interface CategorySelectorListProps {
  name: string;
  label?: string;
  selectedCategory: string;
  selectorDataList: CategorySelectorData[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function CategorySelectorList({
  name,
  label,
  selectedCategory,
  selectorDataList,
  onChange,
}: CategorySelectorListProps) {
  return (
    <fieldset className="flex gap-4 px-4 py-2">
      {label && <legend>{label}</legend>}

      {selectorDataList.map(({ value, text }) => (
        <CategorySelector
          key={value}
          name={name}
          value={value}
          text={text}
          checked={selectedCategory === value}
          onChange={onChange}
        ></CategorySelector>
      ))}
    </fieldset>
  );
}
