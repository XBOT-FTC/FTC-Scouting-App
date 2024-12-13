import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import _ from "lodash";
import { MongoClient, ServerApiVersion } from "mongodb";

import { TeamProperties } from "@/types/team-properties";

const client = new ApolloClient({
  uri: "https://api.ftcscout.org/graphql",
  cache: new InMemoryCache(),
});

export interface Team {
  teamNumber: TeamNumber;
  matches: Match[];
  stats?: Stats;
  team: Team2;
}

export interface Data {
  eventByCode: EventByCode;
}

export interface Match2 {
  matchNum: MatchNumber;
}

export interface EventByCode {
  teams: Team[];
}

export interface Match {
  match: Match2;
}

export interface Team2 {
  name: string;
}

export interface Stats {
  rank: number;
}

export interface Root {
  data: Data;
}

const uri = `mongodb+srv://xbot:${process.env.MONGO_DB_PASSWORD}@scoutingapp-intothedeep.s6jr6.mongodb.net/?retryWrites=true&w=majority&appName=ScoutingApp-IntoTheDeep`;
const mongo = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
    strict: true,
  },
});

client
  .query({
    query: gql`
      query {
        eventByCode(code: "USWAPALT1", season: 2024) {
          teams {
            teamNumber
            team {
              name
            }
            matches {
              match {
                matchNum
              }
            }
            stats {
              ... on TeamEventStats2024 {
                rank
              }
            }
          }
        }
      }
    `,
  })
  .then(async (data: Root) => {
    const upload = new Map<TeamNumber, TeamProperties>();
    data.data.eventByCode.teams.forEach((team) => {
      upload.set(team.teamNumber, {
        matches: _.map(team.matches, (item) => item.match.matchNum),
        rank: team.stats?.rank ?? -1,
        team: team.teamNumber,
        name: team.team.name,
      });
    });

    upload.forEach(async (team) => {
      mongo
        .db("MatchData")
        .collection("TeamProperties")
        .replaceOne({ team: { $in: [team.team] } }, team);
    });
  })
  .catch((why) => {
    console.log(`Cannot update matches reason: ${why}`);
  })
  .finally(async () => {
    await mongo.close();
    console.log("IT CLOSED PLEASE EXIT AFTER 5s IN CASE IT DOESN'T SYNC");
  });
