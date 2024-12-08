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
          defaultValue={scoutData.auto.net}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, net: val },
            });
          }}
          description="Net"
        />
        <ScoringInput
          defaultValue={scoutData.auto.lowBasket}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, lowBasket: val },
            });
          }}
          description="Low"
        />
        <ScoringInput
          defaultValue={scoutData.auto.highBasket}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, highBasket: val },
            });
          }}
          description="High"
        />
      </ScoringSection>

      <ScoringSection sectionName="Scored Specimen">
        <ScoringInput
          defaultValue={scoutData.auto.lowChamber}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, lowChamber: val },
            });
          }}
          description="Low"
        />
        <ScoringInput
          defaultValue={scoutData.auto.highChamber}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, highChamber: val },
            });
          }}
          description="High"
        />
      </ScoringSection>

      <div className="grid place-items-center gap-5 text-center">
        <CheckboxText
          description="Robot Disabled"
          defaultChecked={scoutData.auto.fouled}
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              auto: {
                ...scoutData.auto,
                fouled: checked,
              },
            });
          }}
        />
        <CheckboxText
          defaultChecked={scoutData.auto.fouled}
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              auto: {
                ...scoutData.auto,
                fouled: checked,
              },
            });
          }}
          description="Fouled"
        />
      </div>
      <div className="mb-3 block" />
      <div className="grid place-items-center gap-5 text-center">
        <SelectInputText
          description="Ascent"
          defaultValue={scoutData.auto.ascent}
          onChange={(value) => {
            setScoutData({
              ...scoutData,
              auto: { ...scoutData.auto, ascent: value as Ascent },
            });
          }}
        >
          <option>None</option>
          <option>Observation</option>
          <option>Level 1</option>
        </SelectInputText>
      </div>
    </>
  );
}
