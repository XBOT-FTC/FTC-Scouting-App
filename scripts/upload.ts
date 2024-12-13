import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { MongoClient, ServerApiVersion } from "mongodb";

import { COMPETITION } from "@/constants/competition";
import { AllianceColor } from "@/constants/enums";
import { TeamMatch } from "@/types/match";
import { MatchCollection } from "@/types/team-properties";
import { TeamMatchSchema } from "@/utils/schemas";

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
        eventByCode(code: "USWAPALT1", season: 2024) {
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

export interface Team {
  __typename: string;
  teamNumber: number;
  alliance: string;
  team: Team2;
}

export interface Match {
  __typename: string;
  matchNum: number;
  teams: Team[];
}

export interface Root {
  networkStatus: number;
  loading: boolean;
  data: Data;
}

export interface EventByCode {
  __typename: string;
  matches: Match[];
}

export interface Team2 {
  __typename: string;
  name: string;
}

export interface Data {
  eventByCode: EventByCode;
}

const uri = `mongodb+srv://xbot:${process.env.MONGO_DB_PASSWORD}@scoutingapp-intothedeep.s6jr6.mongodb.net/?retryWrites=true&w=majority&appName=ScoutingApp-IntoTheDeep`;
const mongo = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
    strict: true,
  },
});

function removeDuplicatesByKey<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set();
  return arr.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    }
    seen.add(keyValue);
    return true;
  });
}

client
  .query({
    query: gql(QUERY_STRING),
  })
  .then(async (result: Root) => {
    const convertedArray: MatchCollection = [];
    result.data.eventByCode.matches.forEach(async (value) => {
      const teams: Array<TeamMatch> = [];

      value.teams.forEach((value) => {
        teams.push(
          TeamMatchSchema(
            value.team.name,
            value.teamNumber,
            value.alliance === "Red" ? AllianceColor.Red : AllianceColor.Blue,
            false,
          ) as TeamMatch,
        );
      });
      convertedArray.push({
        match: value.matchNum as MatchNumber,
        teams: teams,
      });
    });

    await mongo
      .db("MatchData")
      .collection(COMPETITION)
      .insertMany(removeDuplicatesByKey(convertedArray, "match"));

    mongo.close();
  })
  .catch((err) => {
    console.log(`Failed to upload data to mongodb because ${err}`);
    mongo.close();
  });
