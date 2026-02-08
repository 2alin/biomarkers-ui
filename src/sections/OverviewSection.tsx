import { useContext } from "react";
import OverviewCard from "../components/OverviewCard";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import { filterLatestBiomarkerResults } from "../utilities/filter";

export default function OverviewSection() {
  const detailedResultsMap = useContext(DetailedResultsContext);

  if (!detailedResultsMap) {
    return;
  }

  let detailedResults = [...detailedResultsMap.values()];
  detailedResults = filterLatestBiomarkerResults(detailedResults);

  const resultsAmount = detailedResults.length;

  const normalDetailedResults = detailedResults.filter(
    ({ result, biomarker }) => {
      if (!biomarker) {
        return false;
      }

      return (
        result.value >= biomarker.referenceRange.low &&
        result.value <= biomarker.referenceRange.high
      );
    },
  );
  const normalAmount = normalDetailedResults.length;

  const needAttentionAmount = resultsAmount - normalAmount;
  const score = `${Math.round((100 * normalAmount) / resultsAmount)} %`;

  return (
    <section className="flex justify-around gap-2 border-b border-gray-100 px-4 py-2 md:justify-center md:gap-16">
      <OverviewCard
        title="total tests"
        value={resultsAmount.toString()}
        colorVariant="secondary"
      >
        <span className="size-6 mask-no-repeat mask-size-[100%] mask-[url(./assets/activity.svg)] bg-secondary-600"></span>
      </OverviewCard>
      <OverviewCard
        title="normal"
        value={normalAmount.toString()}
        colorVariant="positive"
      >
        <span className="size-6 mask-no-repeat mask-size-[100%] mask-[url(./assets/circle-check.svg)] bg-positive-600"></span>
      </OverviewCard>
      <OverviewCard
        title="needs attention"
        value={needAttentionAmount.toString()}
        colorVariant="alert"
      >
        <span className="size-6 mask-no-repeat mask-size-[100%] mask-[url(./assets/circle-alert.svg)] bg-alert-600"></span>
      </OverviewCard>
      <OverviewCard title="health score" value={score} colorVariant="secondary">
        <span className="size-6 mask-no-repeat mask-size-[100%] mask-[url(./assets/trending-up.svg)] bg-secondary-600"></span>
      </OverviewCard>
    </section>
  );
}
