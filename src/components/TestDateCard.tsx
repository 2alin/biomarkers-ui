import type { DetailedResult } from "../contexts/DetailedResultsContext.types";
import { getStatus } from "../utilities/biomarkerStatus";

interface TestDateCardProps {
  detailedResult: DetailedResult;
}

export default function TestDateCard({ detailedResult }: TestDateCardProps) {
  const { result, biomarker } = detailedResult;

  const status = biomarker
    ? getStatus(result.value, biomarker.referenceRange)
    : null;

  const resultDate = new Date(result.sampledAt);
  return (
    <article className="flex px-6 flex-col items-center justify-center gap-2 self-center rounded-lg p-3 outline outline-gray-200">
      <p className="capitalize text-gray-800">Test date</p>
      <p
        className={`font-semibold ${biomarker && status === "normal" ? "text-positive-600" : "text-alert-700"}`}
      >
        {resultDate.toLocaleString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </article>
  );
}
