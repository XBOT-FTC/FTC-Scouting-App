"use client";
import { Button, ButtonGroup, Checkbox, Select } from "flowbite-react";
import { useAtom } from "jotai";
import Link from "next/link";

import { NumberInput } from "@/components/number-input";
import { Acent } from "@/store/drafts";
import { localDraftAtom } from "@/store/localDraft";

export default function Home() {
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);
  const AcentMap = new Map([
    ["Low", Acent.Low],
    ["Medium", Acent.Medium],
    ["High", Acent.High],
    ["Parked", Acent.Parked],
  ]);
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
            defaultValue={localDraft.end.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, highNet: val },
              });
            }}
          />
          <text>Net</text>
          <NumberInput
            defaultValue={localDraft.end.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, highNet: val },
              });
            }}
          />
          <text>Low</text>
          <NumberInput
            defaultValue={localDraft.end.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, highNet: val },
              });
            }}
          />
          <text>High</text>
        </div>
        <text className="flex h-10 justify-center">Scored Specimen</text>
        <div className="grid grid-flow-col grid-rows-2 justify-center gap-5 text-center">
          <NumberInput
            defaultValue={localDraft.end.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, highNet: val },
              });
            }}
          />
          <text>Low</text>
          <NumberInput
            defaultValue={localDraft.end.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, highNet: val },
              });
            }}
          />
          <text>High</text>
        </div>
        <div className="grid grid-flow-col grid-rows-4 justify-center gap-5 text-center">
          <text>
            Acent
            <div className="gap-5">
              <Select
                defaultValue={
                  localDraft.end.acent === Acent.Parked
                    ? "Parked"
                    : localDraft.end.acent === Acent.Low
                      ? "Low"
                      : localDraft.end.acent === Acent.Medium
                        ? "Medium"
                        : localDraft.end.acent === Acent.High
                          ? "High"
                          : undefined
                }
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setLocalDraft({
                    ...localDraft,
                    end: { ...localDraft.end, acent: AcentMap.get(value)! },
                  });
                }}
              >
                <option>Parked</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Select>
            </div>
          </text>
          <text>
            Fouled <div />
            <Checkbox
              defaultChecked={localDraft.end.fouled}
              onChange={(event) => {
                setLocalDraft({
                  ...localDraft,
                  end: {
                    ...localDraft.end,
                    fouled: event.currentTarget.checked,
                  },
                });
              }}
            />
          </text>
          <text>
            Robot Disabled <div />
            <Checkbox
              defaultChecked={localDraft.end.fouled}
              onChange={(event) => {
                setLocalDraft({
                  ...localDraft,
                  end: {
                    ...localDraft.end,
                    fouled: event.currentTarget.checked,
                  },
                });
              }}
            />
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
