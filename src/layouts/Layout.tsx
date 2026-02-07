import { type PropsWithChildren } from "react";
import logoPath from "../assets/app-logo.svg";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-dvh flex-col bg-gray-50">
      <header
        className={`
          flex h-12 items-center justify-between border-b border-b-gray-100 bg-white px-4 py-2
          text-lg font-semibold text-secondary-600
        `}
      >
        <h1 className="flex items-center gap-2">
          <span>
            <img
              src={logoPath}
              alt="Brand logo: a test tube tilted that is half filled"
              className="w-6"
            />
          </span>
          <span>Biomarkers App</span>
          {/* following item is to align title text in the center */}
          <span className="w-6"></span>
        </h1>
      </header>
      <main className="flex flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
