import { atom } from "jotai";

import { TeamMatch } from "@/types/match";
import { TeamMatchSchema } from "@/utils/schemas";

import { AllianceColor } from "./drafts";

export const localDraftAtom = atom<TeamMatch>(
  TeamMatchSchema("N/A", -1, AllianceColor.Red),
);
