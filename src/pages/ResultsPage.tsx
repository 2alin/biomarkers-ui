import { useEffect } from "react";
import * as api from "../api";

import ListSection from "../sections/ListSection";

export default function ResultsPage() {
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const results = await api.results.getAll();
      console.log("results: ", results);
      const biomarkers = await api.biomarkers.getAll();
      console.log("biomarkers", biomarkers);
    };

    fetchData();
  }, []);

  return (
    <>
      <ListSection />
    </>
  );
}
