/* eslint-disable @cspell/spellchecker */
import { MongoClient, ServerApiVersion } from "mongodb";

import { validateMatch } from "@/utils/validators";

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
    const json = await request.json();
    validateMatch.parse(json);
    await client.db("MatchData").collection("Matches").insertOne(json);
    return Response.json("ok");
  } catch (err) {
    return Response.json(`failed: ${err}`);
  }
}

export async function GET() {
  return Response.json("use POST request please");
}
