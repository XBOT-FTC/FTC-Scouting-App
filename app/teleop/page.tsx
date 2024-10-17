"use client";
import { Button } from "flowbite-react";
import { useAtom } from "jotai";
import Link from "next/link";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { ScoringInput } from "@/components/scoring-input";
import { ScoringSection } from "@/components/scoring-section";
import { localDraftAtom } from "@/store/localDraft";

export default function Teleop() {
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);
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
        <div className="grid grid-flow-col grid-rows-2 justify-center gap-5 text-center">
          <ScoringSection sectionName="Scored Sample">
            <ScoringInput
              defaultValue={localDraft.teleop.net}
              onChange={(val) => {
                setLocalDraft({
                  ...localDraft,
                  teleop: { ...localDraft.teleop, net: val },
                });
              }}
              description="Net"
            />
            <ScoringInput
              defaultValue={localDraft.teleop.lowNet}
              onChange={(val) => {
                setLocalDraft({
                  ...localDraft,
                  teleop: { ...localDraft.teleop, lowNet: val },
                });
              }}
              description="Low"
            />
            <ScoringInput
              defaultValue={localDraft.teleop.highNet}
              onChange={(val) => {
                setLocalDraft({
                  ...localDraft,
                  teleop: { ...localDraft.teleop, highNet: val },
                });
              }}
              description="High"
            />
          </ScoringSection>

          <ScoringSection sectionName="Scored Specimens">
            <ScoringInput
              defaultValue={localDraft.teleop.lowNet}
              onChange={(val) => {
                setLocalDraft({
                  ...localDraft,
                  teleop: { ...localDraft.teleop, lowNet: val },
                });
              }}
              description="Low"
            />
            <ScoringInput
              defaultValue={localDraft.teleop.highNet}
              onChange={(val) => {
                setLocalDraft({
                  ...localDraft,
                  teleop: { ...localDraft.teleop, highNet: val },
                });
              }}
              description="High"
            />
          </ScoringSection>
        </div>
        <div className="grid grid-flow-col grid-rows-4 justify-center gap-5 text-center">
          <CheckboxText
            defaultChecked={localDraft.teleop.fouled}
            onChange={(checked) => {
              setLocalDraft({
                ...localDraft,
                teleop: {
                  ...localDraft.teleop,
                  fouled: checked,
                },
              });
            }}
            description="Fouled"
          />
          <CheckboxText
            description="Robot Disabled"
            defaultChecked={localDraft.teleop.fouled}
            onChange={(checked) => {
              setLocalDraft({
                ...localDraft,
                teleop: {
                  ...localDraft.teleop,
                  fouled: checked,
                },
              });
            }}
          />
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
