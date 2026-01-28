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

  let detailedResult = null;

  if (detailedResultsMap && selectedResultId) {
    detailedResult = detailedResultsMap.get(selectedResultId);
  }

  function handleClose() {
    setSelectedResultId(null);
  }

  return (
    <section
      className={`h-full md:ml-4 md:border-l-2 md:border-secondary-600 md:transition-all md:duration-300 md:ease-in-out 
        ${selectedResultId ? "flex-1  md:flex-1" : "flex-0"}
    `}
    >
      {detailedResult && (
        <>
          <header className="bg-secondary-600 text-white flex justify-between items-center p-2">
            <h1 className="font-semibold tracking-wider text-lg ">
              {detailedResult.biomarker
                ? detailedResult.biomarker.name
                : detailedResult.result.biomarkerId}
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
        </>
      )}
    </section>
  );
}
