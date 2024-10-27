import { z } from "zod";

/** for internal usage
 * @private
 */
const validatePhase = z.strictObject({
  lowBasket: z.number(),
  highBasket: z.number(),
  lowChamber: z.number(),
  highChamber: z.number(),
  net: z.number(),
  ascent: z.enum(["None", "Observation", "Level1", "Level2", "Level3"]),
  fouled: z.boolean(),
  disabled: z.boolean(),
});

export const validateTeamMatch = z.strictObject({
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
  end: validatePhase,
  scouted: z.boolean(),
});
