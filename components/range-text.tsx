import { RangeSlider } from "flowbite-react";
import { IntRange, Sum } from "type-fest";

interface RangeTextProps<T extends number, U extends number> {
  onChange?: (value: IntRange<T, Sum<U, 1>>) => void;
  defaultValue?: number;
  description: string;
  min: T;
  max: U;
}

/** A range slider with description */
export function RangeText<T extends number, U extends number>({
  defaultValue,
  description,
  onChange,
  min,
  max,
}: RangeTextProps<T, U>) {
  return (
    <div>
      <text className="select-none dark:text-white">{description}</text>
      <RangeSlider
        onChange={(event) =>
          onChange && onChange!(Number(event.currentTarget.value) as never)
        }
        defaultValue={defaultValue || min}
        min={min}
        max={max}
      />
    </div>
  );
}
