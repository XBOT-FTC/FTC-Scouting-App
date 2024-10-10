"use client";
import { Modal } from "flowbite-react";
import { useState } from "react";
export default function Draft() {
  const [openImport, setOpenImport] = useState<boolean>(false);

  return (
    <Modal
      className="dark:text-gray-100"
      show={openImport}
      onClose={() => setOpenImport(false)}
    >
      <Modal.Header>
        <div className="w-322 h-41 box-content border-black">
          <form action={"/url"} method="GET">
            <label>Match Number</label>
          </form>
        </div>
      </Modal.Header>
    </Modal>
  );
}
