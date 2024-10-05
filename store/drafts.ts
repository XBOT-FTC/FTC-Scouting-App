import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

export type DraftName = string;

export enum Acent {
  Low,
  Medium,
  High,
  Parked,
}

export enum AllianceColor {
  Red,
  Blue,
}

export interface PhaseData {
  /** the amount of pieces scored in lower net */
  lowNet: number;
  /** the amount of pieces scored in high net */
  highNet: number;
  /** the specimens scored in low bar  */
  lowSpecimen: number;
  /** high specimens scored in high bar */
  highSpecimen: number;
  /** the acent the robot ended with */
  acent: Acent;
  /** if the robot has performed a foul move */
  fouled: boolean;
  /** if the robot was disabled during this phase */
  disabled: boolean;
  /** the net score in the floor */
  net: number;
}

export const PhaseDataVaildator = z
  .object({
    lowNet: z.number(),
    highNet: z.number(),
    lowSpecimen: z.number(),
    highSpecimen: z.number(),
    net: z.number(),
    //since enums are compiled to numbers, we can just use literal numbers to vaildate enums
    acent: z.literal(0).or(z.literal(1).or(z.literal(2).or(z.literal(3)))),
    fouled: z.boolean(),
    disabled: z.boolean(),
  })
  .strict("Cannot prase JSON data");

export const DraftDataVaildator = z
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
    auto: PhaseDataVaildator,
    teleop: PhaseDataVaildator,
    end: PhaseDataVaildator,
  })
  .strict("Cannot prase JSON data");

export const DraftDataTreeVaildator = z.array(DraftDataVaildator);

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
  /** the rating for defense */
  defenseRating: 1 | 2 | 3 | 4 | 5;
  /** data for auto phase */
  auto: PhaseData;
  /** the data for auto phase */
  teleop: PhaseData;
  /** the data for end phase */
  end: PhaseData;
  /** the draft name */
  name: string;
}

export const draftAtom = atomWithStorage<Array<DraftData>>(
  "drafts",
  new Array<DraftData>(),
);
