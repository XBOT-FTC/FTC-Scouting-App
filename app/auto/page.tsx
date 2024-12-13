"use client";
import { useAtom, useAtomValue } from "jotai";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { ScoringInput } from "@/components/scoring-input";
import { ScoringSection } from "@/components/scoring-section";
import { SelectInputText } from "@/components/select-input-text";
import { Ascent } from "@/constants/enums";
import { matchAtom } from "@/store/match";
import { scoutAtom } from "@/store/scout";

export default function Auto() {
  const [scoutData, setScoutData] = useAtom(scoutAtom);
  const match = useAtomValue(matchAtom);

  return (
    <>
      <text className="flex justify-center text-center dark:text-white">{`Team: ${scoutData.team} | Match: ${match} | Mode: Auto`}</text>
      <div className="mb-2" />
      <PhaseToggle
        phases={[
          { href: "/auto", name: "Auto" },
          { href: "/teleop", name: "Teleop" },
          { href: "/end", name: "End" },
        ]}
      />

      <ScoringSection sectionName="Scored Sample">
        <ScoringInput
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, net: val },
            });
          }}
          defaultValue={scoutData.auto.net}
          description="Net"
        />
        <ScoringInput
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, lowBasket: val },
            });
          }}
          defaultValue={scoutData.auto.lowBasket}
          description="Low"
        />
        <ScoringInput
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, highBasket: val },
            });
          }}
          defaultValue={scoutData.auto.highBasket}
          description="High"
        />
      </ScoringSection>

      <ScoringSection sectionName="Scored Specimen">
        <ScoringInput
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, lowChamber: val },
            });
          }}
          defaultValue={scoutData.auto.lowChamber}
          description="Low"
        />
        <ScoringInput
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, highChamber: val },
            });
          }}
          defaultValue={scoutData.auto.highChamber}
          description="High"
        />
      </ScoringSection>

      <div className="grid place-items-center gap-5 text-center">
        <CheckboxText
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              auto: {
                ...scoutData.auto,
                fouled: checked,
              },
            });
          }}
          defaultChecked={scoutData.auto.fouled}
          description="Robot Disabled"
        />
        <CheckboxText
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              auto: {
                ...scoutData.auto,
                fouled: checked,
              },
            });
          }}
          defaultChecked={scoutData.auto.fouled}
          description="Fouled"
        />
      </div>
      <div className="mb-3 block" />
      <div className="grid place-items-center gap-5 text-center">
        <SelectInputText
          onChange={(value) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, ascent: value as Ascent },
            });
          }}
          defaultValue={scoutData.auto.ascent}
          description="Ascent"
        >
          <option>None</option>
          <option>Observation</option>
          <option>Level 1</option>
        </SelectInputText>
      </div>
    </>
  );
}
