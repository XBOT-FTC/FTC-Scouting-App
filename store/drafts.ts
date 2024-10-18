import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

import { DraftData } from "@/types/draft";

export type DraftName = string;

export enum Ascent {
  None = "None",
  Observation = "Observation",
  Level1 = "Level1",
  Level2 = "Level2",
  Level3 = "Level3",
}

export enum AllianceColor {
  Red,
  Blue,
}

export const PhaseDataValidator = z
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
  .strict("Cannot prase JSON data");

export const DraftDataValidator = z
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
    auto: PhaseDataValidator,
    teleop: PhaseDataValidator,
    end: PhaseDataValidator,
  })
  .strict("Cannot prase JSON data");

export const DraftDataTreeValidator = z.array(DraftDataValidator);

//we would still need to manually type DraftData since it is more clear for enums

export const draftAtom = atomWithStorage<Array<DraftData>>(
  "drafts",
  new Array<DraftData>(),
);
