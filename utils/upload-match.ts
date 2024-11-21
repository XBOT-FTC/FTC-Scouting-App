import { TeamMatch } from "@/types/match";

/** updates the given match with the team
 * if the team doesn't exist in that match
 * or, the team alliance color doesn't match,
 * it will not upload the match
 */
export async function uploadMatch(match: TeamMatch, matchNumber: MatchNumber) {
  await fetch("http://localhost:3000/api/upload-match", {
    method: "POST",
    body: JSON.stringify({ teamMatch: match, matchNumber: matchNumber } as {
      teamMatch: TeamMatch;
      matchNumber: number;
    }),
  });
}
