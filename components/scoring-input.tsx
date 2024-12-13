import { NumberInput } from "./number-input";

interface ScoringInputProps {
  onChange: (number: number) => void;
  defaultValue: number;
  description: string;
}
/** A input component with description */
export function ScoringInput({
  defaultValue,
  description,
  onChange,
}: ScoringInputProps) {
  return (
    <div>
      <NumberInput defaultValue={defaultValue} onChange={onChange} />
      <div className="mb-2 block" />
      <text className="select-none dark:text-white">{description}</text>
    </div>
  );
}
