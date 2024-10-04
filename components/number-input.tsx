"use client";
import { ArrowBigDown, ChevronDown, ChevronUp, Upload } from "lucide-react";
import { useState } from "react";

export interface NumberInputProps {
  onChange?: (number: number) => void;
}

export function NumberInput({ onChange }: NumberInputProps) {
  const [number, setNumber] = useState<number>(0);
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
          if (number > 0) setNumber(number - 1);
          if (onChange) onChange(number - 1);
        }}
      >
        <ChevronDown className="self-end" />
      </button>
    </div>
  );
}
