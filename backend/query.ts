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
            value.teamNumber.toString(),
            value.teamNumber,
            value.alliance === "Red" ? AllianceColor.Red : AllianceColor.Blue,
            false,
          ),
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
      .insertMany(convertedArray);
  });

fetch("http://localhost:3000/api/fetch-matches", {
  method: "POST",
  body: JSON.stringify([]),
}).then(async (value) => {
  const val = await value.json();
  console.log(JSON.stringify(val));
});
