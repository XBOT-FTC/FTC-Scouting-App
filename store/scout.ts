import { atomWithStorage } from "jotai/utils";

import { TeamMatch } from "@/types/match";
import { TeamMatchSchema } from "@/utils/schemas";

import { AllianceColor } from "../constants/enums";

export const scoutAtom = atomWithStorage<TeamMatch>(
  "ScoutData",
  TeamMatchSchema("N/A", -1, AllianceColor.Red),
);
