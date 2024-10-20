/* eslint-disable @cspell/spellchecker */
import { MongoClient, ServerApiVersion } from "mongodb";

export async function GET() {
  const uri = `mongodb+srv://xbot:${process.env.MONGO_DB_PASSWORD}@scoutingapp-intothedeep.s6jr6.mongodb.net/?retryWrites=true&w=majority&appName=ScoutingApp-IntoTheDeep`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  const cursor = client.db("MatchData").collection("test").find();
  const data = await cursor.toArray();
  return Response.json(data);
}
