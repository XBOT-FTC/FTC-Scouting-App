import { z } from "zod";

import { Ascent } from "@/constants/enums";
import { TeamMatch } from "@/types/match";

/** for internal usage
 * @private
 */
const validatePhase = z.strictObject({
  lowBasket: z.number(),
  highBasket: z.number(),
  lowChamber: z.number(),
  highChamber: z.number(),
  net: z.number(),
  ascent: z.nativeEnum(Ascent),
  fouled: z.boolean(),
  disabled: z.boolean(),
});

export const validateTeamMatch: Zod.ZodSchema<ExcludeNominalKeys<TeamMatch>> =
  z.strictObject({
    team: z.number(),
    color: z.union([z.literal(0), z.literal(1)]),
    comments: z.string(),
    driverRating: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ]),
    name: z.string(),
    auto: validatePhase,
    teleop: validatePhase.omit({ ascent: true }),
    end: z.object({
      ascent: z.nativeEnum(Ascent),
      fouled: z.boolean(),
      disabled: z.boolean(),
    }),
    scouted: z.boolean(),
  });
