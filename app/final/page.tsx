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
import { useState } from "react";

export default function Home() {
  const [openSubmit, setOpenSubmit] = useState(false);

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
            onClick={() =>
              alert(
                "We have detected that you submitted your draft. The implementation on backend isn't done yet tho",
              )
            }
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
          className="max-w-96"
          id="comment"
          placeholder="Leave a comment..."
          required
          rows={4}
        />
      </div>
      <div className="mb-3 block" />
      <div className="flex justify-center">
        Defense rating:
        <RangeSlider id="disabled-range" min={1} max={5} />
      </div>
      <div className="flex justify-center">
        Driver rating:
        <RangeSlider id="disabled-range" min={1} max={5} />
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
