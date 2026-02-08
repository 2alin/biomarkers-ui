import { useContext } from "react";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import type { Result } from "../api";

interface PreviousResultsCardProps {
  detailedResult: DetailedResult;
}

export default function PreviousResultsCard({
  detailedResult,
}: PreviousResultsCardProps) {
  const { result, biomarker } = detailedResult;

  const detailedResultsMap = useContext(DetailedResultsContext);

  if (!detailedResultsMap) {
    return;
  }

  const previousResults: Result[] = [];

  detailedResultsMap.forEach(({ result: resultToCompare }) => {
    if (
      resultToCompare.biomarkerId === result.biomarkerId &&
      resultToCompare.id !== result.id
    ) {
      previousResults.push(resultToCompare);
    }
  });

  if (!previousResults.length) {
    return;
  }

  return (
    <article className="flex px-6 flex-col items-center justify-center gap-2 self-center rounded-lg p-3 outline outline-gray-200">
      <header className="capitalize text-gray-800 ">
        <h1>Previous results</h1>
      </header>
      <div className="text-gray-800 font-semibold">
        {previousResults.map((result) => (
          <p key={result.id} className="flex gap-4">
            <span>{`${getDate(result)}:`}</span>
            <span>{`${result.value} ${biomarker?.standardUnit}`}</span>
          </p>
        ))}
      </div>
    </article>
  );
}

function getDate(result: Result) {
  const resultDate = new Date(result.sampledAt);
  return resultDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
