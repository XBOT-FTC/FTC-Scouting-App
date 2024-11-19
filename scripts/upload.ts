import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { MongoClient, ServerApiVersion } from "mongodb";

import { AllianceColor } from "@/store/drafts";
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
      }`;
/** THIS IS THE COLLECTION NAME STORED STORED FOR EACH MATCH */
const COMPETITION_NAME = "League Meet 1";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

const client = new ApolloClient({
  uri: "https://api.ftcscout.org/graphql",
  cache: new InMemoryCache(),
});

type TeamMatchParticipation = {
  __typename: "TeamMatchParticipation";
  alliance: "Red" | "Blue";
  teamNumber: number;
  teamName: string;
  matches: Array<number>;
};

type Match = {
  __typename: "Match";
  matchNum: number;
  teams: TeamMatchParticipation[];
};

type Event = {
  __typename: "Event";
  matches: Match[];
};

type EventByCodeData = {
  data: {
    eventByCode: Event;
  };
  loading: boolean;
  networkStatus: number;
};

const uri = `mongodb+srv://xbot:${process.env.MONGO_DB_PASSWORD}@scoutingapp-intothedeep.s6jr6.mongodb.net/?retryWrites=true&w=majority&appName=ScoutingApp-IntoTheDeep`;
const mongo = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
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
  .then(async (result: EventByCodeData) => {
    const convertedArray: MatchCollection = [];

    result.data.eventByCode.matches.forEach(async (value) => {
      const teams: Array<TeamMatch> = [];

      value.teams.forEach((value) => {
        teams.push(
          TeamMatchSchema(
            value.teamName,
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
      .collection(COMPETITION_NAME)
      .insertMany(removeDuplicatesByKey(convertedArray, "match"));

    mongo.close();
  })
  .catch((err) => {
    console.log(`Failed to upload data to mongodb because ${err}`);
    mongo.close();
  });
