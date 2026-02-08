import type { Dispatch, SetStateAction } from "react";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";
import ResultCard from "./ResultCard";

interface ResultsListProps {
  detailedResults: DetailedResult[];
  selectedResultId: string | null;
  setSelectedResultId: Dispatch<SetStateAction<string | null>>;
}

export function ResultList({
  detailedResults,
  selectedResultId,
  setSelectedResultId,
}: ResultsListProps) {
  return (
    <ul className="my-1 flex flex-col gap-4 px-4">
      {detailedResults.map((detailedResult) => (
        <li key={detailedResult.result.id} className="flex justify-center">
          <ResultCard
            {...{ detailedResult }}
            isSelected={selectedResultId === detailedResult.result.id}
            onClick={() => {
              setSelectedResultId(detailedResult.result.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
