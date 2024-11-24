import { ApolloClient, InMemoryCache } from "@apollo/client";

/** MUST STRICTLY FOLLOW QUERY LIKE THE EXAMPLE
 * SHOWN BELOW. ONLY MODIFY THE EVENT CODE AND SEASON
 * ```ts
 * `query {
        eventByCode(code: "USWAHALT", season: 2023) {
          matches {
            matchNum
            teams {
              alliance
              teamNumber
              team {
                name
              }
            }
          }
        }
      }`
 * ```
 * @example
 */
const QUERY_STRING = `      query {
        eventByCode(code: "USWARIM2", season: 2024) {
          matches {
            matchNum
            teams {
              alliance
              teamNumber
              team {
                name
              }
            }
          }
        }
      }`;

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

const client = new ApolloClient({
  uri: "https://api.ftcscout.org/graphql",
  cache: new InMemoryCache(),
});

import { AllianceColor } from "@/store/drafts";
import { TeamMatch } from "@/types/match";
import { Match } from "@/types/team-properties";
import { TeamMatchSchema } from "@/utils/schemas";

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

console.log(
  JSON.stringify(
    MatchesSchema(
      1,
      TeamMatchSchema("N/A", -1, AllianceColor.Red),
      TeamMatchSchema("N/A", -1, AllianceColor.Red),
      TeamMatchSchema("N/A", -1, AllianceColor.Red),
      TeamMatchSchema("N/A", -1, AllianceColor.Red),
    ),
  ),
);
