import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { MongoClient, ServerApiVersion } from "mongodb";

import { AllianceColor } from "@/store/drafts";
import { TeamMatch } from "@/types/match";
import { MatchCollection } from "@/types/team-properties";
import { TeamMatchSchema } from "@/utils/schemas";

const client = new ApolloClient({
  uri: "https://api.ftcscout.org/graphql",
  cache: new InMemoryCache(),
});

//chatgpt generated

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
    query: gql`
      query {
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
      }
    `,
  })
  .then(async (result: EventByCodeData) => {
    const convertedArray: MatchCollection = [];

    result.data.eventByCode.matches.forEach((value) => {
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
      .collection("Matches")
      .insertMany(removeDuplicatesByKey(convertedArray, "match"));
    fetch("http://localhost:3000/api/fetch-matches", {
      method: "POST",
      body: JSON.stringify([]),
    }).then(async () => {
      // const val = await value.json();
    });
    mongo.close();
  });
