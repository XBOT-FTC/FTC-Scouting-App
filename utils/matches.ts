import { Match, MatchNumber } from "@/types/team-properties";

export function MatchesSchema(matchNumber: number): Match {
  return { _id: matchNumber as MatchNumber, team: new Map() };
}
