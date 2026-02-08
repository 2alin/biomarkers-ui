import { type Dispatch, type SetStateAction } from "react";

import type { DetailedResult } from "../contexts/DetailedResultsContext.types";

import { ResultList } from "../components/ResultList";

interface ListSectionProps {
  filteredDetails: DetailedResult[];
  selectedResultId: string | null;
  setSelectedResultId: Dispatch<SetStateAction<string | null>>;
}

export default function ListSection({
  filteredDetails,
  selectedResultId,
  setSelectedResultId,
}: ListSectionProps) {
  return (
    <section
      className={`flex overflow-auto  flex-col md:transition-all md:duration-300 md:ease-in-out
      ${selectedResultId ? "flex-0 md:flex-3 lg:flex-2" : "flex-1"}
    `}
    >
      {!filteredDetails.length ? (
        <p className="text-center p-4 font-bold text-secondary-800">
          No filtered results found
        </p>
      ) : (
        <div className="flex flex-col overflow-auto">
          <div className="flex flex-col px-4 items-center">
            <p className="w-full sm:max-w-2xl mb-2   text-sm text-gray-700">{`Showing ${filteredDetails.length} results`}</p>
          </div>
          <ResultList
            detailedResults={filteredDetails}
            {...{ selectedResultId, setSelectedResultId }}
          />
        </div>
      )}
    </section>
  );
}
