import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI is not defined. Operating in resilient offline seed-data mode.");
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Fail fast to avoid blocking requests
      connectTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        console.log("✅ Successfully connected to MongoDB Atlas (Modernisum).");
        return m;
      })
      .catch((err) => {
        console.warn("⚠️ MongoDB connection error (falling back to resilient seed data):", err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    console.warn("⚠️ MongoDB connection could not be established. Resilient seed fallback active.");
  }

  return cached.conn;
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
