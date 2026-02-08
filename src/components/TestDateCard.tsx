import type { DetailedResult } from "../contexts/DetailedResultsContext.types";

interface TestDateCardProps {
  detailedResult: DetailedResult;
}

export default function TestDateCard({ detailedResult }: TestDateCardProps) {
  const { result } = detailedResult;

  const resultDate = new Date(result.sampledAt);
  return (
    <article className="flex px-6 flex-col items-center justify-center gap-2 self-center rounded-lg p-3 outline outline-gray-200">
      <p className="capitalize text-gray-800">Test date</p>
      <p className="font-semibold">
        {resultDate.toLocaleString(undefined, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </article>
  );
}
