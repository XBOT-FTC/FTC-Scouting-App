"use client";
import { debugAtom } from "@/store/debug";
import {
  AllianceColor,
  draftAtom,
  DraftDataTreeVaildator,
} from "@/store/drafts";
import { DraftDataScehema } from "@/utils/DraftDataSchema";
import {
  Button,
  Clipboard,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { useAtom, useAtomValue } from "jotai";
import {
  compressToBase64,
  compressToUTF16,
  decompressFromUTF16,
} from "lz-string";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Drafts() {
  const [drafts, setDrafts] = useAtom(draftAtom);
  const isDebug = useAtomValue(debugAtom);
  const [search, setSerach] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const [openImport, setOpenImport] = useState<boolean>(false);
  const [openDrafting, setOpenDrafting] = useState<boolean>(false);

  //TODO: remove this after prototyping the website.
  useEffect(() => {
    setDrafts(() => new Array());
    setDrafts((draft) => [
      ...draft,
      DraftDataScehema("test", 488, AllianceColor.Red),
    ]);
  }, [setDrafts]);
  return (
    <>
      <Modal className="dark:text-gray-100"
        show={openImport}
        onClose={() => setOpenImport(false)}
      >
        <Modal.Header>Import</Modal.Header>
        <Modal.Body className="">
          Import your data! The entire tree will be vaildated so you do not need
          to worry if your data breaks the website! Though it will override
          current drafts
        </Modal.Body>
        <div className="flex justify-center">
          <TextInput
            onChange={(event) => {
              setInput(event.target.value);
            }}
          ></TextInput>
        </div>
        <div className="h-10"></div>
        <Modal.Footer>
          <Button
            onClick={() => {
              let err;
              //Maybe we could cache the value here so we don't need to prase the same JSON twice
              const deserialized = decompressFromUTF16(input);
              try {
                const deserialized = decompressFromUTF16(input);
                const Import = JSON.parse(deserialized);
                DraftDataTreeVaildator.parse(Import);
              } catch (error) {
                alert("data doesn't match schema");
                err = error;
              } finally {
                if (!err) setDrafts(() => JSON.parse(deserialized));
                setOpenImport(false);
              }
            }}
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
        <ModalHeader>WARNING</ModalHeader>
        <ModalBody>
          New draft is under construction. There will not be any features
          implemented yet.
        </ModalBody>
        <ModalFooter>
          <Button color="failure">Exit</Button>
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
          {drafts.map((value) => {
            value.name;
            return (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={value.name}
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {value.name}
                </TableCell>
                <TableCell>{value.team}</TableCell>
                <TableCell>
                  {value.color === AllianceColor.Red ? "Red" : "Blue"}
                </TableCell>
                <TableCell>
                  <Link
                    onClick={() => {}}
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
        <Clipboard
          valueToCopy={compressToUTF16(JSON.stringify(drafts))}
          label="Export"
        />
        <Button onClick={() => setOpenImport(true)}>Import</Button>
        <Button
          onClick={() => {
            setOpenDrafting(true);
          }}
        >
          New Draft
        </Button>
        <Link href="/edit" passHref>
          <Tooltip content="for development use. Remove when finished prototyping">
            <Button>Mock new drafting</Button>
          </Tooltip>
        </Link>
      </div>
      {isDebug && <text>{JSON.stringify(drafts)}</text>}
    </>
  );
}
