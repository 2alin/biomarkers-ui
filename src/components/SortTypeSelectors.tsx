import { type ChangeEventHandler } from "react";
import OptionSelector from "./OptionSelector";
import type { SortType } from "./SortTypeSelectors.types";

interface SortTypeSelectorsProps {
  name: string;
  selectedSortType: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SortTypeSelectors({
  name,
  selectedSortType,
  onChange,
}: SortTypeSelectorsProps) {
  const sortTypes: SortType[] = ["date", "name"];

  return (
    <div className="flex shrink-0 p-1 gap-3 items-center">
      <span className="font-light text-sm text-gray-900">Sort by:</span>

      {sortTypes.map((sortType) => (
        <OptionSelector
          key={sortType}
          name={name}
          value={sortType}
          text={sortType}
          checked={selectedSortType === sortType}
          onChange={onChange}
        ></OptionSelector>
      ))}
    </div>
  );
}
