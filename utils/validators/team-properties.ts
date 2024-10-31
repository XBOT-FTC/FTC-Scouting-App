import { z } from "zod";

export const validateTeamProperties = z.strictObject({
  team: z.number(),
  rank: z.number(),
  name: z.string(),
  matches: z.array(z.number()),
});
