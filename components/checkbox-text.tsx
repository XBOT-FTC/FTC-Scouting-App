import { Checkbox } from "flowbite-react";

interface CheckboxTextProps {
  description: string;
  defaultChecked: boolean;
  onChange?: (checked: boolean) => void;
}
/** A checkbox with text */
export function CheckboxText({
  description,
  defaultChecked,
  onChange,
}: CheckboxTextProps) {
  return (
    <div className="grid select-none place-items-center">
      {description}
      <div />
      <Checkbox
        defaultChecked={defaultChecked}
        onChange={(event) => {
          if (onChange) {
            onChange(event.currentTarget.checked);
          }
        }}
      />
    </div>
  );
}
