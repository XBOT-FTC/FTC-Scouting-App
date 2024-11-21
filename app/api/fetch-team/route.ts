/* eslint-disable @cspell/spellchecker */
import { MongoClient, ServerApiVersion } from "mongodb";

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
    const json = (await request.json()) as number[];
    console.log(json);
    if (JSON.stringify(json) === "[]") {
      const search = await client
        .db("MatchData")
        .collection("TeamProperties")
        .find()
        .toArray();
      return Response.json(search);
    }

    const search = await client
      .db("MatchData")
      .collection("TeamProperties")
      .find({ team: { $in: json } })
      .toArray();
    console.log(search);
    return Response.json(search);
  } catch (err) {
    return Response.json(err);
  }
}
