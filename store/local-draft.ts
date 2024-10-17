import { atom } from "jotai";

import { DraftData } from "@/types/draft";
import { DraftDataSchema } from "@/utils/draft-data-schema";

import { AllianceColor } from "./drafts";

export const localDraftAtom = atom<DraftData>(
  DraftDataSchema("thing", 1, AllianceColor.Red),
);
