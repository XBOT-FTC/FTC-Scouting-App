"use client";
import { Button } from "flowbite-react";
import { useAtom } from "jotai";
import Link from "next/link";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { ScoringInput } from "@/components/scoring-input";
import { ScoringSection } from "@/components/scoring-section";
import { localDraftAtom } from "@/store/localDraft";

export default function Auto() {
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
            defaultValue={localDraft.auto.net}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, net: val },
              });
            }}
            description="Net"
          />
          <ScoringInput
            defaultValue={localDraft.auto.lowNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, lowNet: val },
              });
            }}
            description="Low"
          />
          <ScoringInput
            defaultValue={localDraft.auto.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, highNet: val },
              });
            }}
            description="High"
          />
        </ScoringSection>

        <ScoringSection sectionName="Scored Specimens">
          <ScoringInput
            defaultValue={localDraft.auto.lowNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, lowNet: val },
              });
            }}
            description="Low"
          />
          <ScoringInput
            defaultValue={localDraft.auto.highNet}
            onChange={(val) => {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, highNet: val },
              });
            }}
            description="High"
          />
        </ScoringSection>
        <CheckboxText
          defaultChecked={localDraft.auto.fouled}
          onChange={(checked) => {
            setLocalDraft({
              ...localDraft,
              auto: {
                ...localDraft.auto,
                fouled: checked,
              },
            });
          }}
          description="Fouled"
        />
        <CheckboxText
          description="Robot Disabled"
          defaultChecked={localDraft.auto.fouled}
          onChange={(checked) => {
            setLocalDraft({
              ...localDraft,
              auto: {
                ...localDraft.auto,
                fouled: checked,
              },
            });
          }}
        />
      </div>
      <div className="flex justify-center">
        <Link href="/teleop">
          <Button>Next</Button>
        </Link>
      </div>
    </>
  );
}
