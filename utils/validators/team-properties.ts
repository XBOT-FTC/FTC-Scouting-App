import { z } from "zod";

import { TeamProperties } from "@/types/team-properties";

export const validateTeamProperties: Zod.Schema<
  ExcludeNominalKeys<TeamProperties>
> = z.strictObject({
  matches: z.array(z.number()),
  team: z.number(),
  rank: z.number(),
  name: z.string(),
});
