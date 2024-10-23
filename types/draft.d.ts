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
  end: PhaseData & {
    ascent: Exclude<Ascent, "Level2" | "Level3">;
  };
  /** the draft name */
  name: string;
}
