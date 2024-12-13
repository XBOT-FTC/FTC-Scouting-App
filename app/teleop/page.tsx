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
      <text className="flex justify-center text-center dark:text-white">{`Team: ${scoutData.team} | Match: ${match} | Mode: Teleop`}</text>
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
              teleop: { ...scoutData.teleop, net: val },
            });
          }}
          defaultValue={scoutData.teleop.net}
          description="Net"
        />
        <ScoringInput
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              teleop: { ...scoutData.teleop, lowBasket: val },
            });
          }}
          defaultValue={scoutData.teleop.lowBasket}
          description="Low"
        />
        <ScoringInput
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              teleop: { ...scoutData.teleop, highBasket: val },
            });
          }}
          defaultValue={scoutData.teleop.highBasket}
          description="High"
        />
      </ScoringSection>

      <ScoringSection sectionName="Scored Specimen">
        <ScoringInput
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              teleop: { ...scoutData.teleop, lowChamber: val },
            });
          }}
          defaultValue={scoutData.teleop.lowChamber}
          description="Low"
        />
        <ScoringInput
          onChange={(val) => {
            setScoutData({
              ...scoutData,
              teleop: { ...scoutData.teleop, highChamber: val },
            });
          }}
          defaultValue={scoutData.teleop.highChamber}
          description="High"
        />
      </ScoringSection>

      <div className="grid place-items-center gap-5 text-center">
        <CheckboxText
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              teleop: {
                ...scoutData.teleop,
                fouled: checked,
              },
            });
          }}
          defaultChecked={scoutData.teleop.fouled}
          description="Fouled"
        />
        <CheckboxText
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              teleop: {
                ...scoutData.teleop,
                fouled: checked,
              },
            });
          }}
          defaultChecked={scoutData.teleop.fouled}
          description="Robot Disabled"
        />
      </div>
    </>
  );
}
