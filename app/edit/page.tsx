"use client";
import { Button, ButtonGroup } from "flowbite-react";
import { useState } from "react";

import { NumberInput } from "@/components/number-input";

export default function Home() {
  const [, setMode] = useState<"auto" | "teleop" | "end">("auto");
  // const [drafts, setDrafts] = useAtom(draftAtom);
  // const [position, setPosition] = useAtom(positionAtom);
  return (
    <>
      <ButtonGroup className="flex justify-center">
        <Button
          onClick={() => {
            setMode("auto");
          }}
        >
          Auto
        </Button>
        <Button
          onClick={() => {
            setMode("teleop");
          }}
        >
          Teleop
        </Button>
        <Button
          onClick={() => {
            setMode("end");
          }}
        >
          End
        </Button>
      </ButtonGroup>
      <div className="h-10" />

      <div className="dark:text-gray-100">
        <text className="flex h-10 justify-center">Scored Sample</text>
        <div className="grid grid-flow-col grid-rows-2 justify-center gap-5 text-center">
          <NumberInput />
          <text>Net</text>
          <NumberInput />
          <text>Low</text>
          <NumberInput />
          <text>High</text>
        </div>
        <text className="flex h-10 justify-center">Scored Specimen</text>
        <div className="grid grid-flow-col grid-rows-2 justify-center gap-5 text-center">
          <NumberInput />
          <text>Low</text>
          <NumberInput />
          <text>High</text>
        </div>
      </div>
    </>
  );
}
