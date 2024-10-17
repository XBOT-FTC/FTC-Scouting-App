"use client";
import { Button, Select } from "flowbite-react";
import { useAtom } from "jotai";
import Link from "next/link";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { ScoringInput } from "@/components/scoring-input";
import { ScoringSection } from "@/components/scoring-section";
import { Ascent } from "@/store/drafts";
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
          defaultValue={localDraft.auto.lowBasket}
          onChange={(val) => {
            setLocalDraft({
              ...localDraft,
              auto: { ...localDraft.auto, lowBasket: val },
            });
          }}
          description="Low"
        />
        <ScoringInput
          defaultValue={localDraft.auto.highBasket}
          onChange={(val) => {
            setLocalDraft({
              ...localDraft,
              auto: { ...localDraft.auto, highBasket: val },
            });
          }}
          description="High"
        />
      </ScoringSection>

      <ScoringSection sectionName="Scored Specimen">
        <ScoringInput
          defaultValue={localDraft.auto.lowChamber}
          onChange={(val) => {
            setLocalDraft({
              ...localDraft,
              auto: { ...localDraft.auto, lowChamber: val },
            });
          }}
          description="Low"
        />
        <ScoringInput
          defaultValue={localDraft.auto.highChamber}
          onChange={(val) => {
            setLocalDraft({
              ...localDraft,
              auto: { ...localDraft.auto, highChamber: val },
            });
          }}
          description="High"
        />
      </ScoringSection>

      <div className="grid place-items-center gap-5 text-center">
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
        <Select
          defaultValue={
            localDraft.auto.ascent === Ascent.Level1
              ? "Level 1"
              : localDraft.auto.ascent === Ascent.Observation
                ? "Observation"
                : undefined
          }
          onChange={(event) => {
            const value = event.currentTarget.value;
            if (value === "Level 1") {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, ascent: Ascent.Level1 },
              });
            }
            if (value === "Observation") {
              setLocalDraft({
                ...localDraft,
                auto: { ...localDraft.auto, ascent: Ascent.Observation },
              });
            }
          }}
        >
          <option>Observation</option>
          <option>Level 1</option>
        </Select>
        <Link href="/teleop">
          <Button>Next</Button>
        </Link>
      </div>
    </>
  );
}
