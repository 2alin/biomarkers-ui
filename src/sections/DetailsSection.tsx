import {
  useContext,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { DetailedResultsContext } from "../contexts/DetailedResultsContext";
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
        flex flex-col h-full overflow-hidden
        md:max-w-xl md:rounded-xl md:border md:border-gray-200
        md:transition-allmd:duration-300 md:ease-in-out 
        ${selectedResultId ? "flex-1  md:flex-2" : "flex-0"}
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
            <DetailsCard {...{ detailedResult }} />
            {detailedResult.biomarker && (
              <NotesCard biomarker={detailedResult.biomarker} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
