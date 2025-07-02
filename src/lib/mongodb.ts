// /lib/mongodb.ts

import mongoose, { Connection } from 'mongoose';

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalCache = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

// Initialize cache if it doesn't exist
if (!globalCache.mongooseCache) {
  globalCache.mongooseCache = { conn: null, promise: null };
}

const cached = globalCache.mongooseCache!;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('Please define MONGODB_URI');

    cached.promise = mongoose.connect(uri).then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
