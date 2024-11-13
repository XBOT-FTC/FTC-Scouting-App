import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { MongoClient, ServerApiVersion } from "mongodb";

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

client
  .query({
    query: gql`
      query {
        eventByCode(code: "USWAHALT", season: 2023) {
          teams {
            teamNumber
            matches {
              match {
                matchNum
              }
            }
          }
          matches {
            matchNum
            teams {
              alliance
              teamNumber
              team {
                quickStats(season: 2023) {
                  eg {
                    rank
                  }
                }
                name
              }
            }
          }
        }
      }
    `,
  })
  .then(() => {});
