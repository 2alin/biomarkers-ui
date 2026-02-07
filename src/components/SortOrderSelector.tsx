import { type ChangeEventHandler } from "react";
import OptionSelector from "./OptionSelector";
import type { SortOrder } from "./SortOrderSelectors.types";

interface SortOrderSelectorsProps {
  name: string;
  isSortAscending: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SortOrderSelectors({
  name,
  isSortAscending,
  onChange,
}: SortOrderSelectorsProps) {
  const sortOrders: SortOrder[] = ["ascendent", "descendent"];

  const selectedSortOrder: SortOrder = isSortAscending
    ? "ascendent"
    : "descendent";

  return (
    <div className="flex p-1 gap-3 items-center">
      <span className="font-light text-sm text-gray-900">Order:</span>

      {sortOrders.map((sortOrder) => (
        <OptionSelector
          key={sortOrder}
          name={name}
          value={sortOrder}
          text={sortOrder}
          checked={selectedSortOrder === sortOrder}
          onChange={onChange}
        ></OptionSelector>
      ))}
    </div>
  );
}
