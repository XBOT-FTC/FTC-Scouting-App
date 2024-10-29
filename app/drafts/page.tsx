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
import { useAtom, useSetAtom } from "jotai";
import { BookDashed, ImportIcon } from "lucide-react";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

import { Export } from "@/components/export";
import { AllianceColor, draftAtom } from "@/store/drafts";
import { editorAtom } from "@/store/editor";
import { TeamMatchSchema } from "@/utils/schemas";
import { validateTeamMatch } from "@/utils/validators/team-match";

export default function Drafts() {
  //Literally refracture the entire code, very messy state management
  const [drafts, setDrafts] = useAtom(draftAtom);
  const [input, setInput] = useState<string>();

  const [openImport, setOpenImport] = useState<boolean>(false);
  const [openDrafting, setOpenDrafting] = useState<boolean>(false);
  const [openWarning, setOpenWarning] = useState<boolean>(false);

  const [draftColor, setDraftColor] = useState<AllianceColor>(
    AllianceColor.Red,
  );

  const [draftName, setDraftName] = useState<string>();
  const [draftTeamNumber, setDraftTeamNumber] = useState<number>();
  const setEditorAtom = useSetAtom(editorAtom);

  return (
    <>
      <Modal
        className="dark:text-gray-100"
        show={openImport}
        onClose={() => setOpenImport(false)}
      >
        <Modal.Header>
          <div className="flex items-center justify-between gap-2">
            <ImportIcon />
            <text>Import</text>
          </div>
        </Modal.Header>
        <Modal.Body />
        <div className="flex justify-center">
          <FileInput
            accept=".scouting"
            onInput={(event) => {
              //TODO: extract this into a function
              const file = event.currentTarget.files?.[0];
              if (file) {
                const fileReader = new FileReader();
                fileReader.onload = (event) => {
                  setInput(event.target?.result as string);
                };
                fileReader.readAsText(file);
              }
            }}
          />
        </div>
        <div className="h-10" />
        <Modal.Footer>
          <Button
            onClick={() => {
              let err;
              //Maybe we could cache the value here so we don't need to prase the same JSON twice
              const deserialized = decompressFromUTF16(input!);
              try {
                const deserialized = decompressFromUTF16(input!);
                const Import = JSON.parse(deserialized);
                z.array(validateTeamMatch).parse(Import);
              } catch (error) {
                alert("data doesn't match schema");
                err = error;
              } finally {
                if (!err) setDrafts(() => JSON.parse(deserialized));
                setOpenImport(false);
              }
            }}
            disabled={input === undefined}
          >
            Import
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={openDrafting}
        onClose={() => {
          setOpenDrafting(false);
        }}
        className="dark:text-gray-100"
      >
        <ModalHeader>
          <div className="flex items-center justify-between gap-2">
            <BookDashed />
            <text>New Draft</text>
          </div>
        </ModalHeader>
        <ModalBody>
          {/* TODO: change this into a react component for cleaner and understandable code. */}
          <div className="mb-2 block">
            <Label value="Draft name" />
          </div>
          <TextInput
            required
            onChange={(event) => {
              setDraftName(event.currentTarget.value);
            }}
          />
          <div className="mb-2" />
          <div className="mb-2 block">
            <Label value="Team name" />
          </div>
          <TextInput
            required
            placeholder="number only"
            onInput={(event) => {
              event.currentTarget.value = event.currentTarget.value.replace(
                //stole this from chatgpt lol
                /[^0-9]/g,
                "",
              );
              setDraftTeamNumber(Number(event.currentTarget.value));
            }}
          />
          <div className="mb-2" />
          <div className="mb-2 block">
            <Label value="Alliance color" />
          </div>
          <Select
            defaultValue="none"
            onChange={(event) => {
              if (event.currentTarget.value === "Red") {
                setDraftColor(AllianceColor.Red);
              } else {
                setDraftColor(AllianceColor.Blue);
              }
            }}
          >
            <option>Red</option>
            <option>Blue</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Link href="/edit" passHref>
            <Button
              disabled={
                draftColor == null ||
                draftTeamNumber == null ||
                draftName == null
              }
              onClick={() => {
                setDrafts(() => [
                  ...drafts,
                  TeamMatchSchema(draftName!, draftTeamNumber!, draftColor),
                ]);
              }}
            >
              Start draft!
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
      <Modal show={openWarning} onClose={() => setOpenWarning(false)}>
        <ModalHeader>WARNING</ModalHeader>
        <ModalBody>
          This will clear all your current drafts. Click I wish to proceed to
          continue
        </ModalBody>
        <ModalFooter>
          <Button
            color="warning"
            onClick={() => {
              setDrafts(() => []);
              setOpenWarning(false);
            }}
          >
            I wish to proceed
          </Button>
        </ModalFooter>
      </Modal>
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Draft name</TableHeadCell>
          <TableHeadCell>Team name</TableHeadCell>
          <TableHeadCell>Color</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {drafts.map((value, index) => {
            return (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {value.name}
                </TableCell>
                <TableCell>{value.team}</TableCell>
                <TableCell>
                  {value.color === AllianceColor.Red ? "Red" : "Blue"}
                </TableCell>
                <TableCell className="flex justify-center gap-10">
                  <Link
                    onClick={() => {
                      setEditorAtom(index);
                    }}
                    href="/edit"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="h-10" />
      <div className="flex justify-center gap-5">
        <Button onClick={() => setOpenImport(true)}>Import</Button>
        <Button
          onClick={() => {
            setOpenDrafting(true);
          }}
        >
          New Draft
        </Button>
        <Export contents={compressToUTF16(JSON.stringify(drafts))}>
          Export
        </Export>
        <Button onClick={() => setOpenWarning(true)}>Clear Drafts</Button>
      </div>
    </>
  );
}
