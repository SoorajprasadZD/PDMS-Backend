import mongoose from "mongoose";
import config from "config";

export class MongoDbConnection {
  public static async connect(): Promise<void> {
    const uri = config.get<string>("database.uri");
    console.log(uri)

    const uri2 = "mongodb+srv://4bh1:kej2TCsaNiZZ5nnQ@anon-insight.99jve.mongodb.net/pdms?retryWrites=true&w=majority&appName=anon-insight"

    await mongoose.connect(uri2);
  }
}
