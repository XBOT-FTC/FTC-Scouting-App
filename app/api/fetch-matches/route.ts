import { MongoClient, ServerApiVersion } from "mongodb";

export async function POST(request: Request) {
  try {
    const uri = `mongodb+srv://xbot:${process.env.MONGO_DB_PASSWORD}@scoutingapp-intothedeep.s6jr6.mongodb.net/?retryWrites=true&w=majority&appName=ScoutingApp-IntoTheDeep`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
        strict: true,
      },
    });
    const requestData = (await request.json()) as {
      matches: Array<number>;
      collection: string;
    };
    if (JSON.stringify(requestData.matches) === "[]") {
      const search = await client
        .db("MatchData")
        .collection(requestData.collection)
        .find()
        .toArray();
      return Response.json(search);
    }

    const search = await client
      .db("MatchData")
      .collection(requestData.collection)
      .find({ match: { $in: requestData.matches } })
      .toArray();
    return Response.json(search);
  } catch (err) {
    console.log("error!", err);
    return Response.json(err);
  }
}
