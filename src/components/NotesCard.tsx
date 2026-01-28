import type { Biomarker } from "../api";

interface NotesCardProps {
  biomarker: Biomarker;
}

export function NotesCard({ biomarker }: NotesCardProps) {
  return (
    <article className="flex gap-2 flex-col bg-primary-100 rounded-xl p-3 gont font-semibold text-gray-600">
      <h1 className="capitalize text-gray-500">add your biomarker notes:</h1>
      <textarea className="h-32 p-2 rounded-xl border border-gray-400" />
    </article>
  );
}
