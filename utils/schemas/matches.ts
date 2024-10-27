import { TeamMatch } from "@/types/draft";

import { validateMatch } from "../validators";

export function MatchesSchema(
  matchNumber: number,
  team1: TeamMatch,
  team2: TeamMatch,
  team3: TeamMatch,
  team4: TeamMatch,
): Zod.infer<typeof validateMatch> {
  return {
    match: matchNumber as MatchNumber,
    team: [team1, team2, team3, team4],
  };
}
