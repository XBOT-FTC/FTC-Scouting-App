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
    const json = (await request.json()) as {
      collection: string;
      matches: Array<number>;
    };
    if (JSON.stringify(json.matches) === "[]") {
      const search = await client
        .db("MatchData")
        .collection("Matches")
        .find()
        .toArray();
      return Response.json(search);
    }
    const search = await client
      .db("MatchData")
      .collection("Matches")
      .find({ match: { $in: json.matches } })
      .toArray();
    return Response.json(search);
  } catch (err) {
    console.log("error!", err);
    return Response.json(err);
  }
}

export async function GET() {
  return Response.json("Please use POST request please.");
}
