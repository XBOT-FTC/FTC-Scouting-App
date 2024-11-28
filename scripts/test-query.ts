import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

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

setInterval(() => {
  client
    .query({
      query: gql(QUERY_STRING),
    })
    .then(async (result) => {
      console.log(`Pinging FTC Scout API: ${JSON.stringify(result)}`);
    })
    .catch((err) => {
      console.log(`Failed to upload data to mongodb because ${err}`);
    });
}, 500);
