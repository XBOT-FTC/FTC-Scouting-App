"use client";
import { useAtom } from "jotai";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { ScoringInput } from "@/components/scoring-input";
import { ScoringSection } from "@/components/scoring-section";
import { scoutAtom } from "@/store/scout";

export default function Teleop() {
  const [localDraft, setLocalDraft] = useAtom(scoutAtom);
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
          defaultValue={localDraft.teleop.lowBasket}
          onChange={(val) => {
            setLocalDraft({
              ...localDraft,
              teleop: { ...localDraft.teleop, lowBasket: val },
            });
          }}
          description="Low"
        />
        <ScoringInput
          defaultValue={localDraft.teleop.highBasket}
          onChange={(val) => {
            setLocalDraft({
              ...localDraft,
              teleop: { ...localDraft.teleop, highBasket: val },
            });
          }}
          description="High"
        />
      </ScoringSection>

      <ScoringSection sectionName="Scored Specimen">
        <ScoringInput
          defaultValue={localDraft.teleop.lowChamber}
          onChange={(val) => {
            setLocalDraft({
              ...localDraft,
              teleop: { ...localDraft.teleop, lowChamber: val },
            });
          }}
          description="Low"
        />
        <ScoringInput
          defaultValue={localDraft.teleop.highChamber}
          onChange={(val) => {
            setLocalDraft({
              ...localDraft,
              teleop: { ...localDraft.teleop, highChamber: val },
            });
          }}
          description="High"
        />
      </ScoringSection>

      <div className="grid place-items-center gap-5 text-center">
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
    </>
  );
}
