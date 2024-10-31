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
    const json = (await request.json()) as TeamProperties;
    validateTeamProperties.parse(json);
    const search = await client
      .db("MatchData")
      .collection("Team Properties")
      .findOne({ team: json.team });
    if (search !== null)
      return Response.json(
        "Matches already exits, maybe you're looking for updating it?",
      );
    await client.db("MatchData").collection("Team Properties").insertOne(json);
    return Response.json("ok");
  } catch (err) {
    return Response.json(err);
  }
}

export async function GET() {
  return Response.json("use POST request please");
}
