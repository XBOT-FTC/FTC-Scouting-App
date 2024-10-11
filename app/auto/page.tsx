"use client";
import { Button, ButtonGroup, Checkbox } from "flowbite-react";
import Link from "next/link";

import { NumberInput } from "@/components/number-input";

export default function Home() {
  // const [localdraft, setLocalDraft] = useAtom(localDraftAtom);
  return (
    <>
      <ButtonGroup className="flex justify-center">
        <Button>
          <Link href="/auto">Auto</Link>
        </Button>

        <Button>
          <Link href="/teleop"> Teleop</Link>
        </Button>

        <Button>
          <Link href="/end">End</Link>
        </Button>
      </ButtonGroup>

      <div className="h-10" />

      <div className="dark:text-gray-100">
        <text className="flex h-10 justify-center">Scored Sample</text>
        <div className="grid grid-flow-col grid-rows-2 justify-center gap-5 text-center">
          <NumberInput onChange={() => {}} />
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
        <div className="grid grid-flow-col grid-rows-4 justify-center gap-5 text-center">
          <text>
            Acent <div /> <Checkbox />
          </text>
          <text>
            Parked <div />
            <Checkbox />
          </text>
          <text>
            Fouled <div />
            <Checkbox />
          </text>
          <text>
            Robot Disabled <div />
            <Checkbox />
          </text>
        </div>
      </div>
      <div className="flex justify-center">
        <Link href="/teleop">
          <Button>Next</Button>
        </Link>
      </div>
    </>
  );
}
