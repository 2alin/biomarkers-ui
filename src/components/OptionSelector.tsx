import { type ChangeEventHandler, type PropsWithChildren } from "react";
import type { OptionSelectorVariant } from "./OptionSelector.types";

interface OptionSelectorProps {
  name: string;
  value: string;
  text: string;
  checked: boolean;
  variant: OptionSelectorVariant;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function OptionSelector({
  name,
  value,
  text,
  checked,
  variant,
  onChange,
}: PropsWithChildren<OptionSelectorProps>) {
  const variants: Record<string, string> = {
    primary: `
              inline-block cursor-pointer rounded-full px-4 py-1 font-medium capitalize shadow-md select-none
              has-focus-visible:outline-2  has-focus-visible:outline-black
              ${checked ? "bg-primary-300" : "bg-white outline-1 outline-secondary-600"}
              `,
    secondary: `
                inline-block cursor-pointer border-t-3 border-b-3 px-1 font-medium capitalize select-none
                has-focus-visible:outline-2 has-focus-visible:outline-black
                ${checked ? "border-t-transparent border-b-secondary-500" : "border-transparent"}
                `,
  };

  return (
    <div>
      <label className={variants[variant]}>
        {text}
        <input
          type="radio"
          name={name}
          value={value}
          onChange={onChange}
          className={"appearance-none"}
        />
      </label>
    </div>
  );
}
