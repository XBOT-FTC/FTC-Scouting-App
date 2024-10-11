"use client";
import { Button, ButtonGroup, Checkbox } from "flowbite-react";
import Link from "next/link";

import { NumberInput } from "@/components/number-input";

export default function Home() {
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
            Acent
            <div className="gap-5">
              <Checkbox />
              <Checkbox />
              <Checkbox />
            </div>
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
        <div className="mb-2 block" />
        <div className="flex justify-center">
          <Link href="/final">
            <Button>Next</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
