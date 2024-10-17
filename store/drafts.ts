import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

export type DraftName = string;

export enum Ascent {
  None,
  Observation,
  Level1,
  Level2,
  Level3,
}

export enum AllianceColor {
  Red,
  Blue,
}

export interface PhaseData {
  /** the amount of pieces scored in lower net */
  lowBasket: number;
  /** the amount of pieces scored in high net */
  highBasket: number;
  /** the net score in the floor */
  net: number;
  /** the specimens scored in low bar  */
  lowChamber: number;
  /** high specimens scored in high bar */
  highChamber: number;
  /** if the robot has performed a foul move */
  fouled: boolean;
  /** if the robot was disabled during this phase */
  disabled: boolean;
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
export interface DraftData {
  /** the team number of the robot */
  team: number;
  /** the color of the alliance */
  color: AllianceColor;
  /** the additional comments scouters can add */
  comments: string;
  /** the rating for driver */
  driverRating: 1 | 2 | 3 | 4 | 5;
  /** data for auto phase */
  auto: PhaseData & {
    ascent: Exclude<Ascent, "Level2" | "Level3">;
  };
  /** the data for auto phase */
  teleop: PhaseData;
  /** the data for end phase */
  end: {
    fouled: boolean;
    disabled: boolean;
    ascent: Ascent;
  };
  /** the draft name */
  name: string;
}

export const draftAtom = atomWithStorage<Array<DraftData>>(
  "drafts",
  new Array<DraftData>(),
);
