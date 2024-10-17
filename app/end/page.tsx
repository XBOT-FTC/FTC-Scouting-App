"use client";
import { Button, Select } from "flowbite-react";
import { useAtom } from "jotai";
import Link from "next/link";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { ScoringInput } from "@/components/scoring-input";
import { ScoringSection } from "@/components/scoring-section";
import { Acent } from "@/store/drafts";
import { localDraftAtom } from "@/store/localDraft";

export default function End() {
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);
  const AcentMap = new Map([
    ["Low", Acent.Low],
    ["Medium", Acent.Medium],
    ["High", Acent.High],
    ["Parked", Acent.Parked],
  ]);
  return (
    <>
      <PhaseToggle
        phases={[
          { href: "/auto", name: "Auto" },
          { href: "/teleop", name: "Teleop" },
          { href: "/end", name: "End" },
        ]}
      />

      <div className="dark:text-gray-100">
        <ScoringSection sectionName="Scored Sample">
          <ScoringInput
            defaultValue={localDraft.end.net}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, net: val },
              });
            }}
            description="Net"
          />
          <ScoringInput
            defaultValue={localDraft.end.lowNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, lowNet: val },
              });
            }}
            description="Low"
          />
          <ScoringInput
            defaultValue={localDraft.end.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, highNet: val },
              });
            }}
            description="High"
          />
        </ScoringSection>

        <ScoringSection sectionName="Scored Specimens">
          <ScoringInput
            defaultValue={localDraft.end.lowSpecimen}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, lowSpecimen: val },
              });
            }}
            description="Low"
          />
          <ScoringInput
            defaultValue={localDraft.end.highSpecimen}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, highSpecimen: val },
              });
            }}
            description="High"
          />
        </ScoringSection>
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
          <CheckboxText
            defaultChecked={localDraft.end.fouled}
            onChange={(checked) => {
              setLocalDraft({
                ...localDraft,
                end: {
                  ...localDraft.end,
                  fouled: checked,
                },
              });
            }}
            description="Fouled"
          />
          <CheckboxText
            description="Robot Disabled"
            defaultChecked={localDraft.end.fouled}
            onChange={(checked) => {
              setLocalDraft({
                ...localDraft,
                end: {
                  ...localDraft.end,
                  fouled: checked,
                },
              });
            }}
          />
        </div>
        <div className="flex justify-center">
          <Link href="/final">
            <Button>Next</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
