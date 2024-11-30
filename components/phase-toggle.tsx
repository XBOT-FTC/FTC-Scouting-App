import { Button, ButtonGroup } from "flowbite-react";
import { useRouter } from "next/navigation";

interface PhaseToggleProps {
  phases: Array<{ name: string; href: string }>;
}

export function PhaseToggle({ phases }: PhaseToggleProps) {
  const router = useRouter();
  return (
    <>
      <ButtonGroup className="flex justify-center">
        {phases.map((value) => {
          return (
            <Button key={value.name} onClick={() => router.push(value.href)}>
              {value.name}
            </Button>
          );
        })}
      </ButtonGroup>
      <div className="mb-5 block" />
    </>
  );
}
