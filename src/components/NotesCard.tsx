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
    <article className="flex gap-2 flex-col bg-primary-100 rounded-xl p-3 gont font-semibold text-gray-600">
      <div className="flex justify-between">
        <label htmlFor={notesInputId} className="capitalize text-gray-500">
          add your biomarker notes:
        </label>
        {/* we are currently only reporting when the storange sync was successfull */}
        <span
          className={`ml-2 size-6 bg-secondary-600 mask-size-[100%] mask-[url(./assets/cloud-check.svg)] transition-all 
            
            ${syncState === "done" || syncState === "idle" ? "opacity-100" : "opacity-0"}`}
        ></span>
      </div>
      <textarea
        id={notesInputId}
        className="h-32 p-2 rounded-xl border border-gray-400"
        value={note}
        onChange={handleChange}
      />
    </article>
  );
}
