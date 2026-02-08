import type { PropsWithChildren } from "react";

type ColorVariant = "secondary" | "positive" | "alert";

interface OverviewCardProps {
  title: string;
  value: string;
  colorVariant: ColorVariant;
}

export default function OverviewCard({
  title,
  value,
  colorVariant,
  children,
}: PropsWithChildren<OverviewCardProps>) {
  const textColors: Record<ColorVariant, string> = {
    secondary: "text-secondary-600",
    positive: "text-positive-600",
    alert: "text-alert-600",
  };

  const bgColors: Record<ColorVariant, string> = {
    secondary: "bg-secondary-100",
    positive: "bg-positive-100",
    alert: "bg-alert-100",
  };

  return (
    <article
      className={`flex items-center justify-center gap-4 rounded-lg px-2 sm:px-4 py-2 outline outline-gray-200
      ${bgColors[colorVariant]}
    `}
    >
      <div className="hidden sm:flex">{children}</div>
      <p className="flex flex-col items-center">
        <span className="text-sm text-center capitalize text-gray-800 font-semibold">
          {title}
        </span>
        <span className={`text-2xl font-semibold ${textColors[colorVariant]}`}>
          {value}
        </span>
      </p>
    </article>
  );
}
