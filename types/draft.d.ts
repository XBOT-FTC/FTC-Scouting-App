import { Ascent } from "@/store/drafts";

import { TeamNumber } from "./team-properties";

import {TeamName} from "./team-properties";

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
  auto: PhaseData & {
    ascent: Ascent;
  };
  /** the data for auto phase */
  teleop: PhaseData;
  /** the data for end phase */
  end: PhaseData & {
    ascent: Ascent;
  };
  /** the draft name */
  name: string;
  /**if this match has scouted or not */
  scouted: boolean;
}

export interface TeamProp{
  team: number;
  name: TeamName;
  rank: number;
  matches: Array<number>;
}
