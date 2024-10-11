"use client";
import { Button, ButtonGroup } from "flowbite-react";
import { useState } from "react";

import { NumberInput } from "@/components/number-input";

export default function Home() {
  const [, setMode] = useState<"auto" | "teleop" | "end">("auto");
  // const [drafts, setDrafts] = useAtom(draftAtom);
  // const editor = useAtomValue(editorAtom);

  // function newSchema() {
  //   return DraftDataScehema(
  //     drafts[editor].name,
  //     drafts[editor].team,
  //     drafts[editor].color,
  //   );
  // }

  // function updateDraft(draftSchema: DraftData) {
  //   const newDrafts = [...drafts];
  //   newDrafts[editor] = draftSchema;
  //   setDrafts(newDrafts);
  // }

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
          <NumberInput
          // defaultValue={drafts[editor].auto.net}
          // onChange={(val) => {
          //   const schema = newSchema();
          //   if (mode === "auto") {
          //     schema.auto.net = val;
          //     updateDraft(schema);
          //   }
          //   if (mode === "teleop") {
          //     schema.teleop.net = val;
          //     updateDraft(schema);
          //   }
          //   if (mode === "end") {
          //     schema.end.net = val;
          //     updateDraft(schema);
          //   }
          // }}
          />
          <text>Net</text>
          <NumberInput onChange={() => {}} />
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
