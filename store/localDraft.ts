import { atom } from "jotai";

import { DraftDataSchema } from "@/utils/DraftDataSchema";

import { AllianceColor, DraftData } from "./drafts";

export const localDraftAtom = atom<DraftData>(
  DraftDataSchema("thing", 1, AllianceColor.Red),
);
