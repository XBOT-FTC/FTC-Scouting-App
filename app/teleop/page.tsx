"use client";
import { useAtom, useAtomValue } from "jotai";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { ScoringInput } from "@/components/scoring-input";
import { ScoringSection } from "@/components/scoring-section";
import { matchAtom } from "@/store/match";
import { scoutAtom } from "@/store/scout";

export default function Teleop() {
  const [scoutData, setScoutData] = useAtom(scoutAtom);
  const match = useAtomValue(matchAtom);
  return (
    <>
      <text className="flex justify-center text-center dark:text-white">{`Team: ${scoutData.team} Match: ${match}`}</text>
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
          defaultValue={scoutData.teleop.net}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              teleop: { ...scoutData.teleop, net: val },
            });
          }}
          description="Net"
        />
        <ScoringInput
          defaultValue={scoutData.teleop.lowBasket}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              teleop: { ...scoutData.teleop, lowBasket: val },
            });
          }}
          description="Low"
        />
        <ScoringInput
          defaultValue={scoutData.teleop.highBasket}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              teleop: { ...scoutData.teleop, highBasket: val },
            });
          }}
          description="High"
        />
      </ScoringSection>

      <ScoringSection sectionName="Scored Specimen">
        <ScoringInput
          defaultValue={scoutData.teleop.lowChamber}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              teleop: { ...scoutData.teleop, lowChamber: val },
            });
          }}
          description="Low"
        />
        <ScoringInput
          defaultValue={scoutData.teleop.highChamber}
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              teleop: { ...scoutData.teleop, highChamber: val },
            });
          }}
          description="High"
        />
      </ScoringSection>

      <div className="grid place-items-center gap-5 text-center">
        <CheckboxText
          defaultChecked={scoutData.teleop.fouled}
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              teleop: {
                ...scoutData.teleop,
                fouled: checked,
              },
            });
          }}
          description="Fouled"
        />
        <CheckboxText
          description="Robot Disabled"
          defaultChecked={scoutData.teleop.fouled}
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              teleop: {
                ...scoutData.teleop,
                fouled: checked,
              },
            });
          }}
        />
      </div>
    </>
  );
}
