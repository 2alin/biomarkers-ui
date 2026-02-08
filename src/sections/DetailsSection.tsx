import {
  useContext,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
import { InterpretationCard } from "../components/InterpretationCard";
import { NotesCard } from "../components/NotesCard";
import TestResultCard from "../components/TestResultCard";
import TestDateCard from "../components/TestDateCard";
import PreviousResultsCard from "../components/PreviousResultsCard";

interface DetailsSectionProps {
  selectedResultId: string | null;
  setSelectedResultId: Dispatch<SetStateAction<string | null>>;
}

export default function DetailsSection({
  selectedResultId,
  setSelectedResultId,
}: DetailsSectionProps) {
  const detailedResultsMap = useContext(DetailedResultsContext);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  let detailedResult = null;

  if (detailedResultsMap && selectedResultId) {
    detailedResult = detailedResultsMap.get(selectedResultId);
  }

  /**
   * Focus on close button when the section opens.
   * Reasons:
   *   - we would like inmediate interaction with the new opened section
   *   - the close button is the first element from top to bottom
   *   - it will allow us to close the section inmediately if we want
   */
  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [selectedResultId]);

  function handleClose() {
    setSelectedResultId(null);
  }

  return (
    <section
      className={`
        flex flex-col h-full overflow-hidden bg-gray-50
        md:max-w-xl md:rounded-xl md:border md:border-gray-200
        md:transition-all md:duration-300 md:ease-in-out 
        ${selectedResultId ? "absolute top-0 bottom-0 md:static md:top-auto md:bottom-auto  md:flex-2" : "flex-0 opacity-0"}
    `}
    >
      {detailedResult && (
        <>
          <header className="bg-secondary-75 border-b border-gray-200 flex justify-between items-center px-4 py-2">
            <h1 className="flex flex-col ">
              <span className="text-sm text-gray-800">
                {detailedResult.biomarker && detailedResult.biomarker.category}
              </span>
              <span className="font-semibold tracking-wider text-lg ">
                {detailedResult.biomarker
                  ? detailedResult.biomarker.name
                  : detailedResult.result.biomarkerId}
              </span>
            </h1>
            <button
              ref={closeButtonRef}
              aria-label="Close details section"
              className="flex size-8 cursor-pointer rounded-md p-1 outline outline-secondary-400"
              onClick={handleClose}
            >
              <span className="size-full bg-secondary-800 mask-[url(./assets/close.svg)] mask-size-[100%]"></span>
            </button>
          </header>
          <div className="flex overflow-auto flex-col p-4 gap-4">
            <InterpretationCard {...{ detailedResult }} />
            <TestResultCard {...{ detailedResult }} />
            <TestDateCard {...{ detailedResult }} />
            <PreviousResultsCard {...{ detailedResult }} />
            {detailedResult.biomarker && (
              <NotesCard biomarker={detailedResult.biomarker} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
