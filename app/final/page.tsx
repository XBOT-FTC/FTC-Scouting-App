"use client";

import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  RangeSlider,
  Textarea,
} from "flowbite-react";
import { useAtom } from "jotai";
import { useState } from "react";

import { localDraftAtom } from "@/store/localDraft";

export default function Home() {
  const [openSubmit, setOpenSubmit] = useState(false);
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);
  return (
    <main className="dark:text-white">
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
      <div className="flex justify-center">
        <Label htmlFor="comment" value="Additional comments" />
      </div>
      <div className="flex justify-center">
        <Textarea
          onChange={(event) => {
            setLocalDraft({
              ...localDraft,
              comments: event.currentTarget.value,
            });
          }}
          className="max-w-96"
          id="comment"
          placeholder="Leave a comment..."
          required
          rows={4}
        />
      </div>
      <div className="mb-3 block" />
      <div className="flex justify-center">
        Driver rating:
        <RangeSlider
          id="disabled-range"
          min={1}
          max={5}
          onChange={(event) => {
            setLocalDraft({
              ...localDraft,
              driverRating: Number(event.currentTarget.value) as
                | 1
                | 2
                | 3
                | 4
                | 5,
            });
          }}
        />
      </div>
      <div className="mb-3 block" />

      <div className="flex justify-center">
        <Button
          onClick={() => {
            setOpenSubmit(true);
          }}
        >
          Submit
        </Button>
      </div>
    </main>
  );
}
