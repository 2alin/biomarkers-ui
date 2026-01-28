import type { ReferenceRange } from "../api";

interface StatusBadgeProps {
  value: number;
  range: ReferenceRange;
}

type statusType = "low" | "normal" | "high";

export default function StatusBadge({ value, range }: StatusBadgeProps) {
  let status: statusType;

  if (value < range.low) {
    status = "low";
  } else if (value > range.high) {
    status = "high";
  } else {
    status = "normal";
  }

  const bgVariant: Record<statusType, string> = {
    low: "bg-orange-600",
    high: "bg-red-600",
    normal: "bg-secondary-600",
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 rounded-full px-4 py-1 text-white
                  ${bgVariant[status]}
                `}
    >
      <span
        className={`bg-white size-4 mask-size-[100%]
            ${
              status === "low"
                ? "mask-[url(./assets/down.svg)]"
                : status === "high"
                  ? "mask-[url(./assets/up.svg)]"
                  : "mask-[url(./assets/check.svg)]"
            }
          `}
      ></span>
      <span className="capitalize font-semibold text-sm">{status}</span>
    </div>
  );
}
