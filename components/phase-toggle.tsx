import { Button, ButtonGroup } from "flowbite-react";
import Link from "next/link";

interface PhaseToggleProps {
  phases: Array<{ name: string; href: string }>;
}

export function PhaseToggle({ phases }: PhaseToggleProps) {
  return (
    <>
      <ButtonGroup className="flex justify-center">
        {phases.map((value) => {
          return (
            <Button key={value.name}>
              <Link href={value.href} passHref>
                {value.name}
              </Link>
            </Button>
          );
        })}
      </ButtonGroup>
      <div className="mb-5 block" />
    </>
  );
}
