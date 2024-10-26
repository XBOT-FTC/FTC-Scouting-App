import { z } from "zod";

import { validateTeamMatch } from "./team-match";

export const validateMatch = z.strictObject({
  match: z.number(),
  team: z.map(z.number(), validateTeamMatch),
});
