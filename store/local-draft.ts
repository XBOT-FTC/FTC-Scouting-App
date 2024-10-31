import { atom } from "jotai";

import { TeamMatch } from "@/types/draft";
import { TeamMatchSchema } from "@/utils/schemas";

import { AllianceColor } from "./drafts";

export const localDraftAtom = atom<TeamMatch>(
  TeamMatchSchema("thing", 1, AllianceColor.Red),
);
