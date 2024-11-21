import { RangeSlider } from "flowbite-react";
import { IntRange, Sum } from "type-fest";

interface RangeTextProps<T extends number, U extends number> {
  description: string;
  min: T;
  max: U;
  defaultValue?: number;
  onChange?: (value: IntRange<T, Sum<U, 1>>) => void;
}

/** A range slider with description */
export function RangeText<T extends number, U extends number>({
  description,
  min,
  max,
  defaultValue,
  onChange,
}: RangeTextProps<T, U>) {
  return (
    <div>
      <text className="select-none">{description}</text>
      <RangeSlider
        defaultValue={defaultValue || min}
        min={min}
        max={max}
        onChange={(event) => {
          if (onChange) onChange(Number(event.currentTarget.value) as never);
        }}
      />
    </div>
  );
}