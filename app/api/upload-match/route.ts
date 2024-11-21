import { assert } from "console";
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
    const json = (await request.json()) as {
      teamMatch: TeamMatch;
      matchNumber: number;
      collection: string;
    };

    const collection = database.collection(json.collection);

    const data = (await collection.findOne({
      match: json.matchNumber,
    })) as Match;

    {
      let found = false;

      data.teams.forEach((otherMatch) => {
        if (
          otherMatch.team === json.teamMatch.team &&
          otherMatch.color === json.teamMatch.color
        ) {
          found = true;
        }
      });
      assert(found);
    }

    const update = new Array<TeamMatch>();
    data.teams.forEach((otherMatch) => {
      if (otherMatch.team === json.teamMatch.team) {
        update.push(json.teamMatch);
      } else {
        update.push(otherMatch);
      }
    });

    await collection.replaceOne(
      {
        match: json.matchNumber,
      },
      { teams: update, match: json.matchNumber },
    );
    return Response.json("ok");
  } catch {
    return Response.error();
  }
}
