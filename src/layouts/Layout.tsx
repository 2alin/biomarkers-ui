import { type PropsWithChildren } from "react";
import logoPath from "../assets/app-logo.svg";

interface LayoutProps {
  lastResultsDate: string | null;
}

export default function Layout({
  lastResultsDate,
  children,
}: PropsWithChildren<LayoutProps>) {
  return (
    <div className="flex h-dvh flex-col bg-gray-50">
      <header
        className={`
          flex justify-between items-center min-h-12 border-b border-b-gray-100 bg-white px-4 py-2
        `}
      >
        <h1 className="flex items-start gap-2 text-lg font-semibold text-secondary-600">
          <span>
            <img
              src={logoPath}
              alt="Brand logo: a test tube tilted that is half filled"
              className="w-6"
            />
          </span>
          <span>Biomarkers App</span>
        </h1>
        {lastResultsDate && (
          <p className="flex gap-2 flex-wrap text-right justify-end text-sm text-gray-700 capitalize">
            <span>Report from:</span>
            <span>{lastResultsDate}</span>
          </p>
        )}
      </header>
      <main className="flex flex-col flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
