import { atom } from "jotai";

import { DraftDataScehema } from "@/utils/DraftDataSchema";

import { AllianceColor, DraftData } from "./drafts";

export const localDraftAtom = atom<DraftData>(
  DraftDataScehema("thing", 1, AllianceColor.Red),
);
