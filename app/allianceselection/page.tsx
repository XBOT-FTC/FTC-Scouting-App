"use client";
import {
  Button,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { useAtom, useAtomValue } from "jotai";
import { BookDashed, ImportIcon } from "lucide-react";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import Link from "next/link";
import { useState } from "react";

import { Export } from "@/components/export";
import { debugAtom } from "@/store/debug";
import {
  AllianceColor,
  draftAtom,
  DraftDataTreeVaildator,
} from "@/store/drafts";
import { DraftDataScehema } from "@/utils/DraftDataSchema";
export default function Draft() {
  const [drafts, setDrafts] = useAtom(draftAtom);
  const isDebug = useAtomValue(debugAtom);
  const [input, setInput] = useState<string>();

  const [openImport, setOpenImport] = useState<boolean>(false);
  const [openDrafting, setOpenDrafting] = useState<boolean>(false);
  const [openWarning, setOpenWarning] = useState<boolean>(false);

  const [draftColor, setDraftColor] = useState<AllianceColor>(
    AllianceColor.Red,
  );
  const [draftName, setDraftName] = useState<string>();
  const [draftTeamNumber, setDraftTeamNumber] = useState<number>();

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
            <select> </select>
          </form>
        </div>
      </Modal.Header>
    </Modal>
  );
}
