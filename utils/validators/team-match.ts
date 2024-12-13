import { z } from "zod";

import { Ascent } from "@/constants/enums";
import { TeamMatch } from "@/types/match";

/** for internal usage
 * @private
 */
const validatePhase = z.strictObject({
  ascent: z.nativeEnum(Ascent),
  highChamber: z.number(),
  highBasket: z.number(),
  lowChamber: z.number(),
  lowBasket: z.number(),
  disabled: z.boolean(),
  fouled: z.boolean(),
  net: z.number(),
});

export const validateTeamMatch: Zod.ZodSchema<ExcludeNominalKeys<TeamMatch>> =
  z.strictObject({
    operatorRating: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ]),
    driverRating: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ]),
    end: z.object({
      ascent: z.nativeEnum(Ascent),
      disabled: z.boolean(),
      fouled: z.boolean(),
    }),
    color: z.union([z.literal(0), z.literal(1)]),
    teleop: validatePhase.omit({ ascent: true }),
    comments: z.string(),
    scouted: z.boolean(),
    auto: validatePhase,
    team: z.number(),
    name: z.string(),
  });
