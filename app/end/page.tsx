"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "flowbite-react";
import { produce } from "immer";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CheckboxText } from "@/components/checkbox-text";
import { PhaseToggle } from "@/components/phase-toggle";
import { RangeText } from "@/components/range-text";
import { SelectInputText } from "@/components/select-input-text";
import { COMPETITION } from "@/constants/competition";
import { Ascent } from "@/constants/enums";
import { matchAtom } from "@/store/match";
import { scoutAtom } from "@/store/scout";
import { TeamMatch } from "@/types/match";

export default function End() {
  const [scoutData, setScoutData] = useAtom(scoutAtom);
  const match = useAtomValue(matchAtom);
  const [openSubmit, setOpenSubmit] = useState(false);
  const matchNumber = useAtomValue(matchAtom);
  const router = useRouter();

  return (
    <>
      <text className="flex justify-center text-center dark:text-white">{`Team: ${scoutData.team} | Match: ${match} | Mode: End`}</text>
      <div className="mb-2" />
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
                fetch("/api/upload-match", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    matchNumber: matchNumber,
                    teamMatch: produce(scoutData, (draft) => {
                      draft.scouted = true;
                    }),
                    collection: COMPETITION,
                  } as {
                    teamMatch: TeamMatch;
                    matchNumber: number;
                    collection: string;
                  }),
                });
              } catch {
                alert("data failed to upload, try again later.");
              } finally {
                setOpenSubmit(false);
                router.push("/allianceselection");
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
          defaultValue={scoutData.end.ascent}
          onChange={(value) => {
            setScoutData({
              ...scoutData,
              end: { ...scoutData.end, ascent: value as Ascent },
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
          defaultChecked={scoutData.end.fouled}
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              end: {
                ...scoutData.end,
                fouled: checked,
              },
            });
          }}
        />
        <CheckboxText
          description="Robot Disabled"
          defaultChecked={scoutData.end.disabled}
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              end: {
                ...scoutData.end,
                disabled: checked,
              },
            });
          }}
        />
        <Textarea
          defaultValue={scoutData.comments}
          onChange={(event) => {
            setScoutData({
              ...scoutData,
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
          defaultValue={scoutData.driverRating}
          description="Driver rating"
          min={1}
          max={5}
          onChange={(value) => {
            setScoutData({
              ...scoutData,
              driverRating: value,
            });
          }}
        />
        <RangeText
          defaultValue={scoutData.operatorRating}
          description="Operator rating"
          min={1}
          max={5}
          onChange={(value) => {
            setScoutData({
              ...scoutData,
              operatorRating: value,
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
