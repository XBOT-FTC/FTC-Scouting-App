import { Ascent } from "@/constants/enums";

import { TeamNumber } from "./team-properties";

/** a certain team's performance in a match */
export interface TeamMatch {
  /** the data for end phase */
  end: {
    disabled: boolean;
    fouled: boolean;
    ascent: Ascent;
  };
  /** data for auto phase */
  auto: {
    ascent: Ascent;
  } & TeamPhase;
  /** the rating for operator */
  operatorRating: 1 | 2 | 3 | 4 | 5;
  /** the rating for driver */
  driverRating: 1 | 2 | 3 | 4 | 5;
  /** the color of the alliance */
  color: AllianceColor;
  /** the data for auto phase */
  teleop: TeamPhase;
  /** the team number of the robot */
  team: TeamNumber;
  /** the additional comments scouters can add */
  comments: string;
  /**if this match has scouted or not */
  scouted: boolean;
  /** the draft name */
  name: string;
}

export interface TeamPhase {
  /** high specimens scored in high bar */
  highChamber: number;
  /** the amount of pieces scored in high net */
  highBasket: number;
  /** the specimens scored in low bar  */
  lowChamber: number;
  /** the amount of pieces scored in lower net */
  lowBasket: number;
  /** if the robot was disabled during this phase */
  disabled: boolean;
  /** if the robot has performed a foul move */
  fouled: boolean;
  /** the net score in the floor */
  net: number;
}
