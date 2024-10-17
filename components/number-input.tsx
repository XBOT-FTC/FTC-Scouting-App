"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export interface NumberInputProps {
  /** the default value for number  */
  defaultValue?: number;
  onChange?: (number: number) => void;
}

export function NumberInput({ onChange, defaultValue = 0 }: NumberInputProps) {
  const [number, setNumber] = useState<number>(defaultValue);

  return (
    <div className="grid size-20 place-items-center rounded-md bg-white shadow-md dark:bg-gray-800 dark:text-gray-200">
      <button
        onClick={() => {
          setNumber(number + 1);
          if (onChange) onChange(number + 1);
        }}
      >
        <ChevronUp className="content-start" />
      </button>
      <div />
      <text className="text-center">{number}</text>
      <div />
      <button
        onClick={() => {
          if (number > 0) {
            setNumber(number - 1);
            if (onChange) onChange(number - 1);
          }
        }}
      >
        <ChevronDown className="self-end" />
      </button>
    </div>
  );
}
