import { RangeSlider } from "flowbite-react";
import { IntRange, Sum } from "type-fest";

interface RangeTextProps<T extends number, U extends number> {
  description: string;
  min: T;
  max: U;
  onChange?: (value: IntRange<T, Sum<U, 1>>) => void;
}

/** A range slider with description */
export function RangeText<T extends number, U extends number>({
  description,
  min,
  max,
  onChange,
}: RangeTextProps<T, U>) {
  return (
    <div>
      <text>{description}</text>
      <RangeSlider
        defaultValue={min}
        min={min}
        max={max}
        onChange={(event) => {
          //we need to disable the type system here since typescript cannot infer this correctly
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (onChange) onChange(Number(event.currentTarget.value) as any);
        }}
      />
    </div>
  );
}
