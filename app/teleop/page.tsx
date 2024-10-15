"use client";
import { Button, ButtonGroup, Checkbox } from "flowbite-react";
import { useAtom } from "jotai";
import Link from "next/link";

import { NumberInput } from "@/components/number-input";
import { localDraftAtom } from "@/store/localDraft";

export default function Home() {
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);
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
          <NumberInput
            defaultValue={localDraft.teleop.net}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                teleop: { ...localDraft.teleop, net: val },
              });
            }}
          />
          <text>Net</text>
          <NumberInput
            defaultValue={localDraft.teleop.lowNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                teleop: { ...localDraft.teleop, lowNet: val },
              });
            }}
          />
          <text>Low</text>
          <NumberInput
            defaultValue={localDraft.teleop.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                teleop: { ...localDraft.teleop, highNet: val },
              });
            }}
          />
          <text>High</text>
        </div>
        <text className="flex h-10 justify-center">Scored Specimen</text>
        <div className="grid grid-flow-col grid-rows-2 justify-center gap-5 text-center">
          <NumberInput
            defaultValue={localDraft.teleop.lowSpecimen}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                teleop: { ...localDraft.teleop, lowSpecimen: val },
              });
            }}
          />
          <text>Low</text>
          <NumberInput
            defaultValue={localDraft.teleop.highSpecimen}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                teleop: { ...localDraft.teleop, highSpecimen: val },
              });
            }}
          />
          <text>High</text>
        </div>
        <div className="grid grid-flow-col grid-rows-4 justify-center gap-5 text-center">
          <text>
            Fouled <div />
            <Checkbox
              defaultChecked={localDraft.teleop.fouled}
              onChange={(event) => {
                setLocalDraft({
                  ...localDraft,
                  teleop: {
                    ...localDraft.teleop,
                    fouled: event.currentTarget.checked,
                  },
                });
              }}
            />
          </text>
          <text>
            Robot Disabled <div />
            <Checkbox
              defaultChecked={localDraft.teleop.disabled}
              onChange={(event) => {
                setLocalDraft({
                  ...localDraft,
                  teleop: {
                    ...localDraft.teleop,
                    disabled: event.currentTarget.checked,
                  },
                });
              }}
            />
          </text>
        </div>
      </div>
      <div className="flex justify-center">
        <Link href="/end">
          <Button>Next</Button>
        </Link>
      </div>
    </>
  );
}
