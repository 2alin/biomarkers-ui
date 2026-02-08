import type { MouseEventHandler } from "react";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";
import StatusBadge from "./StatusBadge";
import { getStatus } from "../utilities/biomarkerStatus";

interface ResultCardProps {
  detailedResult: DetailedResult;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function ResultCard({
  detailedResult,
  isSelected,
  onClick,
}: ResultCardProps) {
  const { result, biomarker } = detailedResult;

  const resultDate = new Date(result.sampledAt);

  return (
    <button
      aria-label={`View details for ${biomarker ? biomarker.name : "biomarker"}`}
      onClick={onClick}
      className={`w-full sm:max-w-2xl rounded-xl p-4  outline-1 cursor-pointer transition-all
                  ${isSelected ? "bg-secondary-75 outline-secondary-400" : "bg-white outline-gray-200"}`}
    >
      <article
        className={`grid items-center gap-x-6 gap-y-2
                    grid-flow-row grid-cols-[1fr_2fr] grid-rows-[auto_auto_auto]
                    sm:grid-cols-[1fr_2fr_1fr] sm:grid-rows-[auto_auto]`}
      >
        {/* biomarker name */}
        <h1 className="order-2 tracking-wider font-semibold justify-self-start text-start sm:justify-self-center sm:text-center">
          {biomarker ? biomarker.name : result.biomarkerId}
        </h1>
        {/* category */}
        <p className="order-4 justify-self-start text-sm font-semibold tracking-wider text-gray-800 sm:order-3 sm:justify-self-end">
          {biomarker && biomarker.category}
        </p>
        {/* date */}
        {/* we are hiding date at the moment, as we may not need it */}
        <p className="hidden justify-self-end text-sm tracking-wide text-gray-800 sm:justify-self-start">
          {resultDate.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {/* value + unit */}
        <p className="order-3 justify-self-end sm:order-4 sm:col-start-2 sm:justify-self-center">
          <span
            className={`
              font-semibold mr-1
              ${biomarker && getStatus(result.value, biomarker.referenceRange) === "normal" ? "text-postive-600" : "text-alert-700"}
            `}
          >
            {result.value}
          </span>
          <span className="text-sm tracking-wide font-semibold text-gray-800 justify-self-start">
            {biomarker && biomarker.standardUnit}
          </span>
        </p>
        {/* status (normal, low, high) */}
        <p className="order-1 justify-self-end sm:justify-self-start">
          {biomarker && (
            <StatusBadge
              value={result.value}
              range={biomarker.referenceRange}
            />
          )}
        </p>
        {/* reference range */}
        <p className="order-5 flex flex-wrap gap-1 justify-self-end justify-end text-sm tracking-wide text-gray-800">
          {biomarker && (
            <>
              <span>Target:</span>
              <span>{`${biomarker.referenceRange.low} - ${biomarker.referenceRange.high}`}</span>
            </>
          )}
        </p>
      </article>
    </button>
  );
}
