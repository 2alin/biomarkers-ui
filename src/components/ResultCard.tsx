import type { MouseEventHandler } from "react";
import type { DetailedResult } from "../contexts/DetailedResultsContext.types";
import StatusBadge from "./StatusBadge";

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
      onClick={onClick}
      className={`w-full sm:max-w-2xl rounded-2xl p-4 cursor-pointer transition-all
                        ${isSelected ? "bg-primary-100" : "bg-secondary-100"}`}
    >
      <article
        className={`grid items-center gap-x-6 gap-y-1
                    grid-flow-col grid-cols-[auto_auto] grid-rows-[auto_auto_auto]
                    sm:grid-cols-[2fr_1fr_1fr] sm:grid-rows-[auto_auto]`}
      >
        {/* biomarker name */}
        <h1 className="order-2 tracking-wider font-semibold text-lg justify-self-start text-start">
          {biomarker ? biomarker.name : result.biomarkerId}
        </h1>
        {/* category */}
        <p className="order-1 justify-self-start text-sm font-semibold tracking-wider text-gray-600 uppercase">
          {biomarker && biomarker.category}
        </p>
        {/* date */}
        <p className="order-4 justify-self-end text-sm tracking-wide text-gray-600 sm:order-3 sm:justify-self-start">
          {resultDate.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {/* measurement */}
        <p className="order-3 sm:order-4 justify-self-start">
          <span className="font-semibold text-2xl mr-1">{result.value}</span>
          <span className="text-sm tracking-wide font-semibold text-gray-600 justify-self-start">
            {biomarker && biomarker.standardUnit}
          </span>
        </p>
        {/* evaluation */}
        <p className="order-5 sm:order-6 justify-self-end row-start-2">
          {biomarker && (
            <StatusBadge
              value={result.value}
              range={biomarker.referenceRange}
            />
          )}
        </p>
        {/* reference range */}
        <p className="order-6 justify-self-end text-sm tracking-wide text-gray-600 sm:order-5">
          {biomarker && (
            <>
              <span className="mr-1">Range:</span>
              <span>{`${biomarker.referenceRange.low} - ${biomarker.referenceRange.high}`}</span>
            </>
          )}
        </p>
      </article>
    </button>
  );
}
