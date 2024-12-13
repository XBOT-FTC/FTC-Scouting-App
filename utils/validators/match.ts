import { z } from "zod";

import { Match } from "@/types/team-properties";

import { validateTeamMatch } from "./team-match";

export const validateMatch: Zod.Schema<ExcludeNominalKeys<Match>> =
  z.strictObject({
    teams: z.array(validateTeamMatch),
    match: z.number(),
  });
