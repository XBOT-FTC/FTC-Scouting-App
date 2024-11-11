import { z } from "zod";

import { Match } from "@/types/team-properties";

import { validateTeamMatch } from "./team-match";

export const validateMatch: Zod.Schema<ExcludeNominalKeys<Match>> =
  z.strictObject({
    match: z.number(),
    teams: z.array(validateTeamMatch),
    _id: z.optional(z.any()),
  });
