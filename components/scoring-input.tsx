import { NumberInput } from "./number-input";

interface ScoringInputProps {
  description: string;
  defaultValue: number;
  onChange: (number: number) => void;
}
/** A input component with description */
export function ScoringInput({
  defaultValue,
  onChange,
  description,
}: ScoringInputProps) {
  return (
    <>
      <NumberInput defaultValue={defaultValue} onChange={onChange} />
      <text>{description}</text>
    </>
  );
}
