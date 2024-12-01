import { MongoClient, ServerApiVersion } from "mongodb";

import { TeamMatch } from "@/types/match";
import { Match } from "@/types/team-properties";

export async function POST(request: Request) {
  try {
    const uri = `mongodb+srv://xbot:${process.env.MONGO_DB_PASSWORD}@scoutingapp-intothedeep.s6jr6.mongodb.net/?retryWrites=true&w=majority&appName=ScoutingApp-IntoTheDeep`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    const database = client.db("MatchData");
    const requestData = (await request.json()) as {
      teamMatch: TeamMatch;
      matchNumber: number;
      collection: string;
    };

    const collection = database.collection(requestData.collection);

    const data = (await collection.findOne({
      match: requestData.matchNumber,
    })) as Match;

    {
      let found = false;

      data.teams.forEach((otherMatch) => {
        if (
          otherMatch.team === requestData.teamMatch.team &&
          otherMatch.color === requestData.teamMatch.color
        ) {
          found = true;
        }
      });
      console.assert(found);
    }

    const update = new Array<TeamMatch>();
    data.teams.forEach((otherMatch) => {
      if (otherMatch.team === requestData.teamMatch.team) {
        update.push(requestData.teamMatch);
      } else {
        update.push(otherMatch);
      }
    });

    await collection.replaceOne(
      {
        match: requestData.matchNumber,
      },
      { teams: update, match: requestData.matchNumber },
    );
    return Response.json("ok");
  } catch {
    return Response.error();
  }
}
