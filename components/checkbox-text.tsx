import { Checkbox } from "flowbite-react";

interface CheckboxTextProps {
  onChange?: (checked: boolean) => void;
  defaultChecked: boolean;
  description: string;
}
/** A checkbox with text */
export function CheckboxText({
  defaultChecked,
  description,
  onChange,
}: CheckboxTextProps) {
  return (
    <div className="grid select-none place-items-center">
      <text className="dark:text-white">{description}</text>
      <div />
      <Checkbox
        onChange={(event) => onChange ?? onChange!(event.currentTarget.checked)}
        defaultChecked={defaultChecked}
      />
    </div>
  );
}
