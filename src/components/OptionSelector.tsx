import { type ChangeEventHandler } from "react";

interface OptionSelectorProps {
  name: string;
  value: string;
  text: string;
  checked: boolean;
  badgeText?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function OptionSelector({
  name,
  value,
  text,
  checked,
  badgeText,
  onChange,
}: OptionSelectorProps) {
  return (
    <div>
      <label
        className={`
          flex items-center cursor-pointer rounded-lg px-2 text-sm capitalize select-none outline-1
          has-focus-visible:outline-2 has-focus-visible:outline-black 
          ${badgeText ? "py-1.5" : "py-0.5"}
          ${checked ? "bg-primary-100 outline-primary-200 " : "outline-gray-200 bg-white"} 
        `}
      >
        {text}
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={"appearance-none"}
        />
        {badgeText && (
          <span
            className={`ml-2 py-0.5 px-2 rounded-full text-gray-800
            ${checked ? "bg-primary-150 " : "bg-gray-100"} 
            `}
          >
            {badgeText}
          </span>
        )}
      </label>
    </div>
  );
}
