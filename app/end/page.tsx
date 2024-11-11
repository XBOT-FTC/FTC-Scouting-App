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
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { RangeText } from "@/components/range-text";
import { SelectInputText } from "@/components/select-input-text";
import { Ascent } from "@/store/drafts";
import { localDraftAtom } from "@/store/local-draft";

export default function End() {
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);
  const [openSubmit, setOpenSubmit] = useState(false);
  const router = useRouter();

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
              try {
                fetch("/api/upload-draft", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(localDraft),
                });
              } catch {
                alert(
                  "data failed to upload. Please try again later or save as draft",
                );
              } finally {
                setOpenSubmit(false);
                router.push("/final");
              }
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
              end: { ...localDraft.end, ascent: value as Ascent },
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
          defaultValue={localDraft.comments}
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
          defaultValue={localDraft.driverRating}
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
