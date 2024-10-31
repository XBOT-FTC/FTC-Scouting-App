/* eslint-disable @cspell/spellchecker */
import { MongoClient, ServerApiVersion } from "mongodb";

import { TeamProperties } from "@/types/team-properties";
import { validateTeamProperties } from "@/utils/validators/team-properties";

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
    const json: { team: number; data: TeamProperties } = await request.json();
    validateTeamProperties.parse(json);
    const database = client.db("MatchData");
    const search = await database.collection("Team Properties").findOne({
      team: json.team,
    });
    if (search === null)
      return Response.json("cannot replace something that doesn't exist");
    database
      .collection("Team Properties")
      .replaceOne({ team: json.team }, { ...search, ...json });
    return Response.json("ok");
  } catch {
    return Response.json(`error ${JSON.stringify(request.body)}`);
  }
}

export async function GET() {
  return Response.json("use POST request please");
}
