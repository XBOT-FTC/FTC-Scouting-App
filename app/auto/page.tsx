"use client";
import { Button, ButtonGroup, Checkbox } from "flowbite-react";
import { useAtom } from "jotai";
import Link from "next/link";

import { NumberInput } from "@/components/number-input";
import { localDraftAtom } from "@/store/localDraft";

export default function Home() {
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);
  /** @see https://stackoverflow.com/questions/55151041/window-is-not-defined-in-next-js-react-app */
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", (event) => {
      const warningMessage =
        "Your changes have not been saved. Are you sure you want to leave?";
      event.preventDefault(); // Standard method for most browsers
      event.returnValue = warningMessage; // Legacy method for some browsers
      return warningMessage; // Some browsers will display a default message
    });
  }

  return (
    <>
      <ButtonGroup className="flex justify-center">
        <Button>
          <Link href="/auto">Auto</Link>
        </Button>

        <Button>
          <Link href="/teleop">Teleop</Link>
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
            defaultValue={localDraft.auto.net}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, net: val },
              });
            }}
          />
          <text>Net</text>
          <NumberInput
            defaultValue={localDraft.auto.lowNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, lowNet: val },
              });
            }}
          />
          <text>Low</text>
          <NumberInput
            defaultValue={localDraft.auto.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, highNet: val },
              });
            }}
          />
          <text>High</text>
        </div>
        <text className="flex h-10 justify-center">Scored Specimen</text>
        <div className="grid grid-flow-col grid-rows-2 justify-center gap-5 text-center">
          <NumberInput
            defaultValue={localDraft.auto.lowSpecimen}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, lowSpecimen: val },
              });
            }}
          />
          <text>Low</text>
          <NumberInput
            defaultValue={localDraft.auto.highSpecimen}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, highSpecimen: val },
              });
            }}
          />
          <text>High</text>
        </div>
        <div className="grid grid-flow-col grid-rows-4 justify-center gap-5 text-center">
          <text>
            Fouled <div />
            <Checkbox
              defaultChecked={localDraft.auto.fouled}
              onChange={(event) => {
                setLocalDraft({
                  ...localDraft,
                  auto: {
                    ...localDraft.auto,
                    fouled: event.currentTarget.checked,
                  },
                });
              }}
            />
          </text>
          <text>
            Robot Disabled <div />
            <Checkbox
              defaultChecked={localDraft.auto.disabled}
              onChange={(event) => {
                setLocalDraft({
                  ...localDraft,
                  auto: {
                    ...localDraft.auto,
                    disabled: event.currentTarget.checked,
                  },
                });
              }}
            />
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
