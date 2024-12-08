import { PropsWithChildren } from "react";

interface SelectInputProps extends PropsWithChildren {
  defaultValue?: string;
  onChange?: (value: string) => void;
  description: string;
}

export function SelectInputText({
  children,
  description,
  defaultValue,
  onChange,
}: SelectInputProps) {
  return (
    <div className="grid select-none place-items-center text-center">
      <text className="select-none dark:text-white">{description}</text>
      <select
        className="rounded-md text-center dark:text-black"
        defaultValue={defaultValue}
        onChange={(event) => onChange && onChange!(event.currentTarget.value)}
      >
        {children}
      </select>
    </div>
  );
}
