import { type ChangeEventHandler, type PropsWithChildren } from "react";

interface OptionSelectorProps {
  name: string;
  value: string;
  text: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function OptionSelector({
  name,
  value,
  text,
  checked,
  onChange,
}: PropsWithChildren<OptionSelectorProps>) {
  return (
    <div>
      <label
        className={`
          inline-block cursor-pointer rounded-lg px-2 py-0.5 text-sm capitalize select-none outline-1
          has-focus-visible:outline-2 has-focus-visible:outline-black 
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
      </label>
    </div>
  );
}
