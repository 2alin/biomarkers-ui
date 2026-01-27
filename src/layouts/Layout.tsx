import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-dvh w-dvw overflow-hidden">
      <header className="bg-blue-900 flex justify-center items-center h-12 py-2  text-3xl font-bold text-white">
        <h1>Biomarkers APP</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
