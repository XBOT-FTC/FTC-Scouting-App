import { TeamMatch } from "@/types/match";
import { Match } from "@/types/team-properties";

export async function uploadMatch(match: TeamMatch, team: MatchNumber) {
  await fetch("http://localhost:3000/api/fetch-matches", {
    method: "POST",
    body: JSON.stringify([team]),
  }).then(async (response) => {
    const parsed = (await response.json()) as Array<TeamMatch>;
    console.log(JSON.stringify(parsed));
    fetch("api/update-match", {
      method: "POST",
      body: JSON.stringify({ match: team, teams: parsed } as Match),
    });
  });
}
