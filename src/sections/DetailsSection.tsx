import { useContext, type Dispatch, type SetStateAction } from "react";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import closeIcon from "../assets/arrow-right.svg";
import { DetailsCard } from "../components/DetailsCard";
import { NotesCard } from "../components/NotesCard";

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
      className={`h-full md:shadow-xl md:rounded-tl-md overflow-auto md:transition-all md:duration-300 md:ease-in-out 
        ${selectedResultId ? "flex-1  md:flex-1" : "flex-0"}
    `}
    >
      {detailedResult && (
        <div>
          <header className="bg-secondary-600 text-white flex justify-between items-center px-4 py-2">
            <h1 className="font-semibold tracking-wider text-lg ">
              {detailedResult.biomarker
                ? detailedResult.biomarker.name
                : detailedResult.result.biomarkerId}
            </h1>
            <button
              aria-label="Close details section"
              className="size-7 rounded-full cursor-pointer mx-2"
              onClick={handleClose}
            >
              <img src={closeIcon} alt="" className="size-full"></img>
            </button>
          </header>
          <div className="flex flex-col p-3 gap-3">
            <DetailsCard {...{ detailedResult }} />
            {detailedResult.biomarker && (
              <NotesCard biomarker={detailedResult.biomarker} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
