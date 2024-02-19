import mongoose, { Mongoose } from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

/**
 * Due to the serverless nature of NextJS a new connection is instantiated for
 * every DB call, so we need to cache the connection for optimization purpose
 */
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGO_DB_URL) throw new Error("Missing MONGO_DB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_DB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
