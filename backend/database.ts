import { MongoClient, ServerApiVersion } from "mongodb";

import { AllianceColor, DraftData } from "@/store/drafts";
import { DraftDataSchema } from "@/utils/draft-data-schema";

require("dotenv").config();

// eslint-disable-next-line @cspell/spellchecker
const uri = `mongodb+srv://xbot:${process.env.MONGO_DB_PASSWORD}@scoutingapp-intothedeep.s6jr6.mongodb.net/?retryWrites=true&w=majority&appName=ScoutingApp-IntoTheDeep`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("MatchData").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

/** utility function that uploads the draft. CURRENTLY ONLY UPLOADS TO `test` COLLECTION.
 * CHANGE IT AFTER THE CODE IS READY.
 */
export async function uploadDraft(schema: DraftData) {
  try {
    await client.connect();
    await client.db("MatchData").collection("test").insertOne(schema);
  } catch (err) {
    console.log(
      `theres something wrong with the data store. Skill issue :skull: ${err}`,
    );
    alert(
      `theres something wrong with the data store. Skill issue :skull: ${err}`,
    );
  }
}

export async function readDrafts() {
  try {
    const cursor = client.db("MatchData").collection("test").find();
    console.log(await cursor.toArray());
  } catch (err) {
    console.log(
      `theres something wrong with the data store. Skill issue :skull: ${err}`,
    );
    alert(
      `theres something wrong with the data store. Skill issue :skull: ${err}`,
    );
  }
}

run().catch(console.dir);
uploadDraft(DraftDataSchema("da lao", 488, AllianceColor.Red)).finally(() => {
  client.close();
});
