import type { DetailedResult } from "../contexts/DetailedResultsContext.types";
import { getStatus } from "../utilities/biomarkerStatus";

interface TestResultCardProps {
  detailedResult: DetailedResult;
}

export default function TestResultCard({
  detailedResult,
}: TestResultCardProps) {
  const { result, biomarker } = detailedResult;

  const status = biomarker
    ? getStatus(result.value, biomarker.referenceRange)
    : null;

  return (
    <article className="flex px-6 flex-col items-center justify-center gap-2 self-center rounded-lg p-3 outline outline-gray-200">
      <p>
        <span
          className={`
              text-3xl font-semibold mr-1
              ${biomarker && status === "normal" ? "text-positive-600" : "text-alert-700"}
            `}
        >
          {result.value}
        </span>
        <span className="text-sm tracking-wide font-semibold text-gray-800 justify-self-start">
          {biomarker && biomarker.standardUnit}
        </span>
      </p>
      <p className="flex gap-2 text-gray-800">
        {biomarker && (
          <>
            <span className="capitalize">Reference range:</span>
            <span>{`${biomarker.referenceRange.low} - ${biomarker.referenceRange.high} ${biomarker.standardUnit}`}</span>
          </>
        )}
      </p>
    </article>
  );
}
