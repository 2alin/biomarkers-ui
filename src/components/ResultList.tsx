import type { Dispatch, SetStateAction } from "react";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";

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
    <ul className="grow">
      {detailedResults.map(({ result, biomarker }) => (
        <li
          key={result.id}
          onClick={() => {
            setSelectedResultId(result.id);
          }}
          className={selectedResultId === result.id ? "bg-yellow-200" : ""}
        >
          {`id: ${result.id} - bname: ${biomarker?.name} - bcat: ${biomarker?.category} - date: ${result.sampledAt}`}
        </li>
      ))}
    </ul>
  );
}
