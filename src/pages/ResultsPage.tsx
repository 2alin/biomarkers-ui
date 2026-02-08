import { useEffect, useState } from "react";
import * as api from "../api";

import ListSection from "../sections/ListSection";
import type { FetchState } from "./ResultsPage.types";
import LoadingSection from "../sections/LoadingSection";
import ErrorSection from "../sections/ErrorSection";
import type {
  DetailedResult,
  DetailedResultMap,
} from "../contexts/DetailedResultsContext.types";
import {
  createDetailedResultsMap,
  DetailedResultsContext,
} from "../contexts/DetailedResultsContext";
import DetailsSection from "../sections/DetailsSection";
import {
  defaultAscendingByType,
  sortDetailedResults,
} from "../utilities/sorting";
import ControlsSection from "../sections/ControlsSection";
import { filterLatestBiomarkerResults } from "../utilities/filter";
import OverviewSection from "../sections/OverviewSection";

export default function ResultsPage() {
  const [fetchState, setFetchState] = useState<FetchState>("idle");
  const [detailedResultsMap, setDetailedResultsMap] =
    useState<DetailedResultMap | null>(null);

  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

  const initialSortType = "date";

  const [filteredDetails, setFilteredDetails] = useState<DetailedResult[]>([]);

  /**
   * Initialization: fetch results and biomarkers data
   */
  useEffect(() => {
    const fetchData = async () => {
      setFetchState("loading");

      try {
        const [results, biomarkers] = await Promise.all([
          fetchResults(),
          fetchBiomarkers(),
        ]);

        const newMap = createDetailedResultsMap(results, biomarkers);
        setDetailedResultsMap(newMap);

        let newFilteredDetails = newMap ? [...newMap.values()] : [];
        newFilteredDetails = filterLatestBiomarkerResults(newFilteredDetails);
        newFilteredDetails = sortDetailedResults(
          newFilteredDetails,
          initialSortType,
          defaultAscendingByType[initialSortType],
        );
        setFilteredDetails(newFilteredDetails);

        setFetchState("success");
      } catch (err) {
        console.error("Error while fetching data: ", err);
        setFetchState("error");
      }
    };

    fetchData();
  }, []);

  if (fetchState === "idle") {
    // Currently we don't need to display a loading state before fetching starts.
    // This may change if the process before reaching fetching state gets heavier.
    return;
  }

  if (fetchState === "loading") {
    return <LoadingSection />;
  }

  if (fetchState === "error") {
    return <ErrorSection />;
  }

  if (!detailedResultsMap) {
    return;
  }

  return (
    <DetailedResultsContext value={detailedResultsMap}>
      <OverviewSection />
      <ControlsSection
        {...{
          initialSortType,
          filteredDetails,
          setFilteredDetails,
          setSelectedResultId,
        }}
      />
      <div className="flex md:px-4 md:py-2 md:justify-center overflow-auto">
        <ListSection
          {...{ filteredDetails, selectedResultId, setSelectedResultId }}
        />
        <DetailsSection {...{ selectedResultId, setSelectedResultId }} />
      </div>
    </DetailedResultsContext>
  );
}

async function fetchResults(): Promise<api.Result[]> {
  try {
    return api.results.getAll();
  } catch (err) {
    console.error("Error while fetching clinical results: ", err);
    throw err;
  }
}
async function fetchBiomarkers(): Promise<api.Biomarker[]> {
  try {
    return api.biomarkers.getAll();
  } catch (err) {
    console.error("Error while fetching biomarkers: ", err);
    throw err;
  }
}
