import type { ReferenceRange } from "../api";
import { getStatus } from "../utilities/biomarkerStatus";
import type { StatusType } from "../utilities/biomarkerStatus.types";

interface StatusBadgeProps {
  value: number;
  range: ReferenceRange;
}

export default function StatusBadge({ value, range }: StatusBadgeProps) {
  const status = getStatus(value, range);

  const bgVariant: Record<StatusType, string> = {
    low: "bg-alert-100",
    high: "bg-alert-100",
    normal: "bg-postive-100",
  };

  const outlineVariant: Record<StatusType, string> = {
    low: "outline-alert-300",
    high: "outline-alert-300",
    normal: "outline-postive-300",
  };

  const textVariant: Record<StatusType, string> = {
    low: "text-alert-900",
    high: "text-alert-900",
    normal: "text-postive-900",
  };

  return (
    <span
      className={`flex justify-center items-center gap-2 rounded-full px-3 py-1 outline
                  ${textVariant[status]}
                  ${bgVariant[status]}
                  ${outlineVariant[status]}
                `}
    >
      <span
        className={`size-4 mask-size-[100%]
            ${
              status === "low"
                ? "mask-[url(./assets/down.svg)] bg-alert-900"
                : status === "high"
                  ? "mask-[url(./assets/up.svg)] bg-alert-900"
                  : "mask-[url(./assets/check.svg)] bg-postive-900"
            }
          `}
      ></span>
      <span className="capitalize text-sm">{status}</span>
    </span>
  );
}
