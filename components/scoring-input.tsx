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
    <div>
      <NumberInput defaultValue={defaultValue} onChange={onChange} />
      <div className="mb-2 block" />
      <text className="select-none dark:text-white">{description}</text>
    </div>
  );
}
