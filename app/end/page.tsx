"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  Textarea,
} from "flowbite-react";
import { useAtom } from "jotai";
import { useState } from "react";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { RangeText } from "@/components/range-text";
import { Ascent } from "@/store/drafts";
import { localDraftAtom } from "@/store/localDraft";

export default function End() {
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);
  const [openSubmit, setOpenSubmit] = useState(false);

  const AscentMap = new Map([
    ["Level 1", Ascent.Level1],
    ["Level 2", Ascent.Level2],
    ["Level 3", Ascent.Level3],
    ["Observation", Ascent.Observation],
  ]);
  return (
    <>
      <Modal
        show={openSubmit}
        onClose={() => setOpenSubmit(false)}
        className="dark:text-white"
      >
        <ModalHeader className="flex justify-center">Confirming</ModalHeader>
        <ModalBody>You are submitting this draft! Are you sure!</ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              alert(
                `Mock uploading draft to MONGODB (remove this alert in public release):\n\n${JSON.stringify(localDraft)}`,
              );
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <PhaseToggle
        phases={[
          { href: "/auto", name: "Auto" },
          { href: "/teleop", name: "Teleop" },
          { href: "/end", name: "End" },
        ]}
      />

      <div className="grid place-items-center gap-5 text-center dark:text-gray-100">
        <text>
          Ascent
          <Select
            defaultValue={
              localDraft.end.ascent === Ascent.Observation
                ? "Observation"
                : localDraft.end.ascent === Ascent.Level1
                  ? "Level 1"
                  : localDraft.end.ascent === Ascent.Level2
                    ? "Level 2"
                    : localDraft.end.ascent === Ascent.Level3
                      ? "Level 3"
                      : undefined
            }
            onChange={(event) => {
              const value = event.currentTarget.value;
              setLocalDraft({
                ...localDraft,
                end: { ...localDraft.end, ascent: AscentMap.get(value)! },
              });
            }}
          >
            <option>Observation</option>
            <option>Level 1</option>
            <option>Level 2</option>
            <option>Level 3</option>
          </Select>
        </text>
        <CheckboxText
          description="Fouled"
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
        <CheckboxText
          description="Robot Disabled"
          defaultChecked={localDraft.end.disabled}
          onChange={(checked) => {
            setLocalDraft({
              ...localDraft,
              end: {
                ...localDraft.end,
                disabled: checked,
              },
            });
          }}
        />
        <Textarea
          onChange={(event) => {
            setLocalDraft({
              ...localDraft,
              comments: event.currentTarget.value,
            });
          }}
          className="max-w-56"
          id="comment"
          placeholder="Additional comments..."
          required
          rows={4}
        />
        <RangeText
          description="Driver rating"
          min={1}
          max={5}
          onChange={(value) => {
            setLocalDraft({
              ...localDraft,
              driverRating: value,
            });
          }}
        />

        <Button
          onClick={() => {
            setOpenSubmit(true);
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

{
  /* <ScoringSection sectionName="Scored Sample">
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
        </ScoringSection> */
}

{
  /* <ScoringSection sectionName="Scored Specimen">
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
        </ScoringSection> */
}
