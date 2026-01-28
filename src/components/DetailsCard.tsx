import type { Biomarker, Result } from "../api";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";
import { getStatus } from "../utilities/biomarkerStatus";
import type { StatusType } from "../utilities/biomarkerStatus.types";

interface DetailsCardProps {
  detailedResult: DetailedResult;
}

export function DetailsCard({ detailedResult }: DetailsCardProps) {
  const { result, biomarker } = detailedResult;

  const resultDate = new Date(result.sampledAt);

  const fieldNameClass = "justify-self-end capitalize text-gray-500";

  return (
    <article className="bg-primary-100 grid grid-cols-[1fr_3fr] gap-x-3 gap-y-2 rounded-xl p-3 gont font-semibold text-gray-600">
      {/* Category */}
      {biomarker && (
        <>
          <p className={fieldNameClass}>category:</p>
          <p>{biomarker.category}</p>
        </>
      )}
      {/* Biomarker name */}
      {biomarker && (
        <>
          <p className={fieldNameClass}>name:</p>
          <p>{biomarker.name}</p>
        </>
      )}
      {/* Sampled date */}
      <p className={fieldNameClass}>sampled at:</p>
      <p>{resultDate.toLocaleString()}</p>
      {/* Result value */}
      <p className={fieldNameClass}>result:</p>
      <p>
        <span>{result.value}</span>
        <span className="ml-2">{biomarker?.standardUnit}</span>
      </p>
      {/* Reference range */}
      {biomarker && (
        <>
          <p className={fieldNameClass}>Range:</p>
          <p>
            {`${biomarker.referenceRange.low} - ${biomarker.referenceRange.high}`}
          </p>
        </>
      )}
      {/* Interpration */}
      {biomarker && (
        <>
          <p className={fieldNameClass}>remarks:</p>
          <p>{getInterpration(result, biomarker)}</p>
        </>
      )}
    </article>
  );
}

/**
 * Gets a simple interpreation of the biomarker results
 *
 * @param result Clinical result data
 * @param biomarker Biomarker data
 * @returns A text intepration of the clinical results.
 */
function getInterpration(result: Result, biomarker: Biomarker) {
  const advices: Record<StatusType, string> = {
    high: "We suggest you to improve your lifestyle and visit a doctor",
    low: "Please visit a doctor as you may need professional advice",
    normal:
      "That is great news! Your current lifestyle is having good effects for this biomarker",
  };

  const status = getStatus(result.value, biomarker.referenceRange);

  const interpration = `Your result was ${status}. ${advices[status]}.`;

  return interpration;
}
