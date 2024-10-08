/* eslint-disable react/react-in-jsx-scope */
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

export default function Drafts() {
  //Literally refracture the entire code, very messy state management
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
  // const [editor, setEditorAtom] = useAtom(editorAtom);

  return (
    <>
    <ModalHeader>
    </ModalHeader>
    <ModalBody>
        <div className="welcome">
            <p>Welcome!</p>
            <img src = "image.png" width={201} height={191}/>
            <div className="box-content h-428 w-277 p-4 border-black"></div>
            <form action={"/url"} method="GET">
                 <p>Enter Name</p>
                <input type="text" placeholder="Name" required></input>
                <button type="submit">Next</button>
            </form>
        </div>
    </ModalBody>
    </>
 );

}
