import { atomWithStorage } from "jotai/utils";

import { DraftDataScehema } from "@/utils/DraftDataSchema";

import { AllianceColor, DraftData } from "./drafts";

export const localDraftAtom = atomWithStorage<DraftData>(
  "LocalDraft",
  DraftDataScehema("thing", 1, AllianceColor.Red),
);
