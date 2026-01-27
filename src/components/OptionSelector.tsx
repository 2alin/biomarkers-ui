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
  return (
    <div>
      <label
        className={
          variant === "primary"
            ? `
              inline-block cursor-pointer rounded-full px-4 py-1 font-medium capitalize shadow-md select-none
              has-focus-visible:outline-4  has-focus-visible:outline-secondary-800
              ${checked ? "bg-primary-300" : "bg-white outline-1 outline-secondary-600"}
              `
            : variant === "secondary"
              ? `
                inline-block cursor-pointer border-t-3 border-b-3 px-1 font-medium capitalize select-none
                has-focus-visible:outline-4 has-focus-visible:outline-secondary-800
                ${checked ? "border-t-transparent border-b-secondary-500" : "border-transparent"}
                `
              : ""
        }
      >
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
