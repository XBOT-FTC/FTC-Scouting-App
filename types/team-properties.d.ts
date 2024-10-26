import { DraftData } from "./draft";

export type TeamPropertiesCollection = Array<TeamProperties>;
export type MatchCollection = Array<Match>;

export interface TeamProperties {
  _id: TeamNumber;
  rank: number;
  name: string;
  matches: Array<MatchNumber>;
}

export interface Match {
  _id: MatchNumber;
  //TODO: remove this intersection and put it into DraftData once the schema is proven right
  team: Map<TeamNumber, DraftData & { scouted: boolean }>;
}

export type MatchNumber = number & {
  /** force typescript to recognize this as
   * a unique type
   * @deprecated
   */
  __nominal_do_not_use_match_number: unique symbol;
};

export type TeamNumber = number & {
  /** force typescript to recognize this as
   * a unique type
   * @deprecated
   */
  __nominal_do_not_use_team_number: unique symbol;
};

export type Rank = number & {
  /** force typescript to recognize this as
   * a unique type
   * @deprecated
   */
  __nominal_do_not_use_rank: unique symbol;
};
