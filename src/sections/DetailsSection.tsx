import { useContext, type Dispatch, type SetStateAction } from "react";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import closeIcon from "../assets/arrow-right.svg";

interface DetailsSectionProps {
  selectedResultId: string | null;
  setSelectedResultId: Dispatch<SetStateAction<string | null>>;
}

export default function DetailsSection({
  selectedResultId,
  setSelectedResultId,
}: DetailsSectionProps) {
  const detailedResultsMap = useContext(DetailedResultsContext);

  if (!selectedResultId || !detailedResultsMap) {
    return;
  }

  const detailedResult = detailedResultsMap.get(selectedResultId);

  if (!detailedResult) {
    return;
  }

  const { result, biomarker } = detailedResult;

  function handleClose() {
    setSelectedResultId(null);
  }

  return (
    <section className="sm:border-l-2 sm:border-secondary-600 sm:ml-4 h-full w-full sm:w-2xl">
      <header className="bg-secondary-600 text-white flex justify-between items-center p-2">
        <h1 className="font-semibold tracking-wider text-lg ">
          {biomarker ? biomarker.name : result.biomarkerId}
        </h1>
        <button
          aria-label="Close Details section"
          className="size-7 rounded-full cursor-pointer mx-4"
          onClick={handleClose}
        >
          <img src={closeIcon} alt="" className="size-full"></img>
        </button>
      </header>
      <p>Details Section</p>
      <p>Selected ID: {selectedResultId}</p>
    </section>
  );
}
