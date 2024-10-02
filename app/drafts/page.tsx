"use client";
import { debugAtom } from "@/store/debug";
import { AllianceColor, draftAtom } from "@/store/drafts";
import {
  Button,
  Clipboard,
  ClipboardWithIcon,
  ClipboardWithIconText,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { useAtom, useAtomValue } from "jotai";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Drafts() {
  const [drafts, setDrafts] = useAtom(draftAtom);
  const isDebug = useAtomValue(debugAtom);
  const [search, setSerach] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const [openImport, setOpenImport] = useState<boolean>(false);
  //TODO: remove this after prototyping the website.
  useEffect(() => {
    setDrafts(() => new Array());
    setDrafts((draft) => [
      ...draft,
      { color: AllianceColor.Red, name: "test", team: 488 },
    ]);
  }, [setDrafts]);
  return (
    <>
      <Modal show={openImport} onClose={() => setOpenImport(false)}>
        <Modal.Header>Import</Modal.Header>
        <Modal.Body>
          Importing wrong data will break the website
          {" (will be fixed in future updates)"}. It will also override your
          current drafts.
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
              //TODO: Implement type guards to prevent web page to crash
              setDrafts(() => JSON.parse(input));
            }}
          >
            Import
          </Button>
        </Modal.Footer>
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
        <Clipboard valueToCopy={JSON.stringify(drafts)} label="Export" />
        <Button onClick={() => setOpenImport(true)}>Import</Button>
      </div>

      {isDebug && <text>{JSON.stringify(drafts)}</text>}
    </>
  );
}
