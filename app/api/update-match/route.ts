/* eslint-disable @cspell/spellchecker */
import { MongoClient, ServerApiVersion } from "mongodb";

import { Match } from "@/types/team-properties";
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
    const json = (await request.json()) as Match;

    validateTeamProperties.parse(json);
    const search = await client
      .db("MatchData")
      .collection("Matches")
      .findOne({ matches: json.match });
    if (search === null)
      return Response.json("cannot replace something that doesn't exit");
    await client
      .db("MatchData")
      .collection("Matches")
      .replaceOne(
        { match: json.match },
        {
          ...search,
          ...json,
        },
      );
    return Response.json("ok");
  } catch {
    return Response.json("failed");
  }
}

export async function GET() {
  return Response.json("use POST request please");
}