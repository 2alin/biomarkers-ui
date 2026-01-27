import { type ChangeEventHandler, type PropsWithChildren } from "react";

interface CategorySelectorProps {
  name: string;
  value: string;
  text: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function CategorySelector({
  name,
  value,
  text,
  checked,
  onChange,
}: PropsWithChildren<CategorySelectorProps>) {
  return (
    <div>
      <label
        className={`
          inline-block rounded-full px-4 py-2 font-medium capitalize shadow-md
          focus-within:outline-4 focus-within:outline-green-400
          ${checked ? "bg-blue-800 text-white" : "bg-white outline-1 outline-gray-400"}
        `}
      >
        <input
          type="radio"
          name={name}
          value={value}
          onChange={onChange}
          className={"appearance-none"}
        />
        {text}
      </label>
    </div>
  );
}
