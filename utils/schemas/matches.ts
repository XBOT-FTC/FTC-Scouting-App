import { TeamMatch } from "@/types/match";
import { Match } from "@/types/team-properties";

export function MatchesSchema(
  matchNumber: number,
  team1: TeamMatch,
  team2: TeamMatch,
  team3: TeamMatch,
  team4: TeamMatch,
): Match {
  return {
    match: matchNumber as MatchNumber,
    teams: [team1, team2, team3, team4],
  };
}
