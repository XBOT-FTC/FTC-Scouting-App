import { atomWithStorage } from "jotai/utils";

import { TeamMatch } from "@/types/match";

export type DraftName = string;

export enum Ascent {
  None = "None",
  Observation = "Observation",
  Level1 = "Level1",
  Level2 = "Level2",
  Level3 = "Level3",
}

export enum AllianceColor {
  Red,
  Blue,
}

//we would still need to manually type DraftData since it is more clear for enums

export const draftAtom = atomWithStorage<Array<TeamMatch>>(
  "drafts",
  new Array<TeamMatch>(),
);
