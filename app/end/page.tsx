"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "flowbite-react";
import { useAtom } from "jotai";
import { useState } from "react";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { RangeText } from "@/components/range-text";
import { SelectInputText } from "@/components/select-input-text";
import { localDraftAtom } from "@/store/local-draft";
import { CalculatePoints } from "@/utils/calculate-points";

export default function End() {
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);
  const [openSubmit, setOpenSubmit] = useState(false);

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
              const points = CalculatePoints(localDraft);
              alert(
                `Mock uploading draft to MONGODB (remove this alert in public release): 
                \nauto: ${points.auto} \nteleop: ${points.teleop} \nend: ${points.end} \ntotal: ${points.auto + points.teleop + points.end}
                \n${JSON.stringify(localDraft)}`,
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

      <div className="grid place-items-center gap-5 text-center">
        <SelectInputText
          defaultValue={localDraft.end.ascent}
          onChange={(value) => {
            setLocalDraft({
              ...localDraft,
              end: { ...localDraft.end, ascent: value },
            });
          }}
          description="Ascent"
        >
          <option>None</option>
          <option>Observation</option>
          <option>Level1</option>
          <option>Level2</option>
          <option>Level3</option>
        </SelectInputText>
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
