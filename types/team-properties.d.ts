import { DraftData } from "./draft";

export type TeamPropertiesCollection = Array<TeamProperties>;
export type MatchCollection = Array<Match>;

export interface TeamProperties {
  team: TeamNumber;
  rank: number;
  name: string;
  matches: Array<MatchNumber>;
}

export interface Match {
  match: MatchNumber;
  //TODO: remove this intersection and put it into DraftData once the schema is proven right
  teams: Array<DraftData>;
}
