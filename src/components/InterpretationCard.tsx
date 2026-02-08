import type { DetailedResult } from "../contexts/DetailedResultsContext.types";
import { getStatus } from "../utilities/biomarkerStatus";
import type { StatusType } from "../utilities/biomarkerStatus.types";

interface InterpretationCardProps {
  detailedResult: DetailedResult;
}

export function InterpretationCard({
  detailedResult,
}: InterpretationCardProps) {
  const { result, biomarker } = detailedResult;

  if (!biomarker) {
    return;
  }

  const status = getStatus(result.value, biomarker.referenceRange);

  return (
    <article
      className={`outline rounded-lg p-3
      ${
        status === "normal"
          ? "bg-positive-100 outline-positive-300"
          : "bg-alert-100 outline-alert-300"
      }
    `}
    >
      <header
        className={`flex items-start gap-2 font-semibold
        ${status === "normal" ? "text-positive-900" : "text-alert-900"}
        `}
      >
        <span
          className={`size-5 mask-size-[100%] 
          ${
            status === "normal"
              ? "mask-[url(./assets/circle-check.svg)] bg-positive-900"
              : "mask-[url(./assets/circle-alert.svg)] bg-alert-900"
          }
          `}
        ></span>
        <h1>{getTitle(status)}</h1>
      </header>
      <p
        className={`pt-1
        ${status === "normal" ? "text-positive-800" : "text-alert-800"}
        `}
      >
        {getAdvice(status)}
      </p>
    </article>
  );
}

function getTitle(status: StatusType) {
  switch (status) {
    case "low":
      return "Bellow normal";
    case "high":
      return "Above normal";
    case "normal":
      return "Within normal";
    default:
      return status;
  }
}

function getAdvice(status: StatusType) {
  switch (status) {
    case "low":
      return "The result is bellow the reference range and may need attention. Please consult your healthcare provider for the best plan to improve your lifestyle.";
    case "high":
      return "The result is above the reference range and may need attention. Please consult your healthcare provider for the best plan to improve your lifestyle.";
    case "normal":
      return "The result is within the reference range. Stay maintaining a healthy lifestyle and consult your healthcare provider for the best way to monitor it.";
    default:
      return "";
  }
}
