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
        onClose={() => setOpenSubmit(false)}
        className="dark:text-white"
        show={openSubmit}
      >
        <ModalHeader className="flex justify-center">Confirming</ModalHeader>
        <ModalBody>You are submitting this draft! Are you sure!</ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              try {
                fetch("/api/upload-match", {
                  body: JSON.stringify({
                    teamMatch: produce(scoutData, (draft) => {
                      draft.scouted = true;
                    }),
                    matchNumber: matchNumber,
                    collection: COMPETITION,
                  } as {
                    teamMatch: TeamMatch;
                    matchNumber: number;
                    collection: string;
                  }),
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
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
          onChange={(value) => {
            setScoutData({
              ...scoutData,
              end: { ...scoutData.end, ascent: value as Ascent },
            });
          }}
          defaultValue={scoutData.end.ascent}
          description="Ascent"
        >
          <option>None</option>
          <option>Observation</option>
          <option>Level1</option>
          <option>Level2</option>
          <option>Level3</option>
        </SelectInputText>
        <CheckboxText
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              end: {
                ...scoutData.end,
                fouled: checked,
              },
            });
          }}
          defaultChecked={scoutData.end.fouled}
          description="Fouled"
        />
        <CheckboxText
          onChange={(checked) => {
            setScoutData({
              ...scoutData,
              end: {
                ...scoutData.end,
                disabled: checked,
              },
            });
          }}
          defaultChecked={scoutData.end.disabled}
          description="Robot Disabled"
        />
        <Textarea
          onChange={(event) => {
            setScoutData({
              ...scoutData,
              comments: event.currentTarget.value,
            });
          }}
          placeholder="Additional comments..."
          defaultValue={scoutData.comments}
          className="max-w-56"
          id="comment"
          required
          rows={4}
        />
        <RangeText
          onChange={(value) => {
            setScoutData({
              ...scoutData,
              driverRating: value,
            });
          }}
          defaultValue={scoutData.driverRating}
          description="Driver rating"
          min={1}
          max={5}
        />
        <RangeText
          onChange={(value) => {
            setScoutData({
              ...scoutData,
              operatorRating: value,
            });
          }}
          defaultValue={scoutData.operatorRating}
          description="Operator rating"
          min={1}
          max={5}
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
