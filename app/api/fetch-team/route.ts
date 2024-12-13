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
    const requestData = (await request.json()) as number[];
    if (JSON.stringify(requestData) === "[]") {
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
      .find({ team: { $in: requestData } })
      .toArray();
    return Response.json(search);
  } catch (err) {
    return Response.json(err);
  }
}

export async function GET() {
  const uri = `mongodb+srv://xbot:${process.env.MONGO_DB_PASSWORD}@scoutingapp-intothedeep.s6jr6.mongodb.net/?retryWrites=true&w=majority&appName=ScoutingApp-IntoTheDeep`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      deprecationErrors: true,
      strict: true,
    },
  });
  try {
    const search = await client
      .db("MatchData")
      .collection("TeamProperties")
      .find()
      .toArray();
    return Response.json(search);
  } catch (err) {
    return Response.json(err);
  }
}
