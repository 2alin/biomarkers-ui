import { type ChangeEventHandler } from "react";
import OptionSelector from "./OptionSelector";
import type { SortType } from "./SortSelectorList.types";

interface SortSelectorList {
  name: string;
  selectedSortType: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SortSelectorList({
  name,
  selectedSortType,
  onChange,
}: SortSelectorList) {
  const sortTypes: SortType[] = ["date", "name"];

  return (
    <div className="flex gap-4 px-4 py-2 items-center">
      <span className="font-medium">Sort by:</span>

      {sortTypes.map((sortType) => (
        <OptionSelector
          key={sortType}
          name={name}
          value={sortType}
          text={sortType}
          checked={selectedSortType === sortType}
          variant="secondary"
          onChange={onChange}
        ></OptionSelector>
      ))}
    </div>
  );
}
