import { Ascent } from "@/constants/enums";

import { TeamNumber } from "./team-properties";

export interface TeamPhase {
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

/** a certain team's performance in a match */
export interface TeamMatch {
  /** the team number of the robot */
  team: TeamNumber;
  /** the color of the alliance */
  color: AllianceColor;
  /** the additional comments scouters can add */
  comments: string;
  /** the rating for driver */
  driverRating: 1 | 2 | 3 | 4 | 5;
  /** data for auto phase */
  auto: TeamPhase & {
    ascent: Ascent;
  };
  /** the data for auto phase */
  teleop: TeamPhase;
  /** the data for end phase */
  end: {
    ascent: Ascent;
    disabled: boolean;
    fouled: boolean;
  };
  /** the draft name */
  name: string;
  /**if this match has scouted or not */
  scouted: boolean;
}
