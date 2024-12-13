import { PropsWithChildren } from "react";

interface SelectInputProps extends PropsWithChildren {
  onChange?: (value: string) => void;
  defaultValue?: string;
  description: string;
}

export function SelectInputText({
  defaultValue,
  description,
  children,
  onChange,
}: SelectInputProps) {
  return (
    <div className="grid select-none place-items-center text-center">
      <text className="select-none dark:text-white">{description}</text>
      <select
        onChange={(event) => onChange && onChange!(event.currentTarget.value)}
        className="rounded-md text-center dark:text-black"
        defaultValue={defaultValue}
      >
        {children}
      </select>
    </div>
  );
}
