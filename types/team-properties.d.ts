import { ObjectId } from "mongodb";

import { TeamMatch } from "./match";

export interface TeamProperties {
  matches: Array<MatchNumber>;
  team: TeamNumber;
  rank: number;
  name: string;
}
export interface Match {
  teams: Array<TeamMatch>;
  match: MatchNumber;
  _id?: ObjectId;
}

export type TeamPropertiesCollection = Array<TeamProperties>;

export type MatchCollection = Array<Match>;
