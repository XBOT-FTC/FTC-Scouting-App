import { z } from "zod";

/** for internal usage */
const validatePhase = z
  .object({
    lowNet: z.number(),
    highNet: z.number(),
    lowSpecimen: z.number(),
    highSpecimen: z.number(),
    net: z.number(),
    //since enums are compiled to numbers, we can just use literal numbers to validate enums
    ascent: z.literal(0).or(z.literal(1).or(z.literal(2).or(z.literal(3)))),
    fouled: z.boolean(),
    disabled: z.boolean(),
  })
  .strict("Cannot parse JSON data");

export const validateTeamMatch = z
  .object({
    team: z.number(),
    color: z.literal(0).or(z.literal(1)),
    comments: z.string(),
    driverRating: z
      .literal(1)
      .or(z.literal(2).or(z.literal(3).or(z.literal(4).or(z.literal(5))))),
    defenseRating: z
      .literal(1)
      .or(z.literal(2).or(z.literal(3).or(z.literal(4).or(z.literal(5))))),
    name: z.string(),
    auto: validatePhase,
    teleop: validatePhase,
    end: validatePhase,
  })
  .strict("Cannot parse JSON data");
