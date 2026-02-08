import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import storage from "../storage";
import type { Biomarker } from "../api";

type SyncState = "idle" | "syncing" | "done" | "error";

interface NotesCardProps {
  biomarker: Biomarker;
}

export function NotesCard({ biomarker }: NotesCardProps) {
  const notesInputId = useId();
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const syncTimeOutRef = useRef(0);

  const [note, setNote] = useState("");

  /**
   * Initial sync with storage
   */
  useEffect(() => {
    const fetchNotes = async () => {
      let newNote = await storage.notes.get(biomarker.id);

      // Handling no biomarker notes stored. Initializing with empty string.
      if (newNote === undefined) {
        newNote = "";
        setSyncState("syncing");
        try {
          storage.notes.set(biomarker.id, newNote);
          setSyncState("done");
        } catch (err) {
          console.error("Issue with local storage. Notes may not save.", err);
          setSyncState("error");
        }
      }

      setNote(newNote);
    };

    fetchNotes();
  }, [biomarker]);

  /**
   * Handle changes in the notes input element
   *
   * @param event Change event
   */
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newNote = event.target.value;

    setNote(newNote);

    // -----------------------------------------------------
    // let's wait 300ms until the user stops typing to store

    setSyncState("syncing");
    if (syncTimeOutRef.current) {
      clearTimeout(syncTimeOutRef.current);
    }

    syncTimeOutRef.current = setTimeout(() => {
      try {
        storage.notes.set(biomarker.id, newNote);
        setSyncState("done");
      } catch (err) {
        console.error("Issue with local storage. Notes may not save.", err);
        setSyncState("error");
      }

      syncTimeOutRef.current = 0;
    }, 300);
  }

  return (
    <article className="flex gap-2 flex-col rounded-xl font-semibold text-gray-600">
      <header className="flex gap-2 justify-between">
        <label
          htmlFor={notesInputId}
          className="flex gap-1 items-start capitalize text-gray-800"
        >
          <span className="size-5 mask-size-[100%] mask-[url(./assets/notebook-pen.svg)] bg-gray-800" />
          <span>add your biomarker notes:</span>
        </label>
        {/* we are currently only reporting when the storange sync was successfull */}
        <span
          className={`flex capitalize gap-1 font-medium text-sm items-end transition-all ${syncState === "done" || syncState === "idle" ? "opacity-100" : "opacity-0"}`}
        >
          <span>saved</span>
          <span
            className={`size-6 bg-gray-800 mask-size-[100%] mask-[url(./assets/cloud-check.svg)]`}
          ></span>
        </span>
      </header>
      <textarea
        id={notesInputId}
        className="h-32 bg-white p-2 rounded-lg outline outline-gray-200"
        value={note}
        onChange={handleChange}
      />
    </article>
  );
}
