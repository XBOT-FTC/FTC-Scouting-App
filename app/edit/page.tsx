"use client";
import { NumberInput } from "@/components/number-input";
import { Acent, AllianceColor, DraftData } from "@/store/drafts";
import { DraftDataScehema } from "@/utils/DraftDataSchema";
import { Button, ButtonGroup } from "flowbite-react";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"auto" | "teleop" | "end">("auto");
  const localData: DraftData = DraftDataScehema("test", 488, AllianceColor.Red);
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

      <div>
        <text className="flex h-10 justify-center">Scored Sample</text>
        <div className="grid grid-flow-col grid-rows-2 justify-center gap-5 text-center">
          <NumberInput
            onChange={(val) => {
              localData.auto!.net = val;
            }}
          />
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
