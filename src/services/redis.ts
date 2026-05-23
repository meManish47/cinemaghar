import { createClient, RedisClientType } from "redis";

// ─── Singleton instance ───────────────────────────────────────────────────────
let redis: RedisClientType | null = null;
let connectPromise: Promise<unknown> | null = null;

/**
 * Returns a connected Redis client, or null if REDIS_URL is not set
 * (e.g. during Vercel build time). Always safe to call — never throws.
 */
export async function getRedis(): Promise<RedisClientType | null> {
  const redisUrl = process.env.REDIS_URL;

  // No URL configured → skip Redis entirely (build time / no Redis setup)
  if (!redisUrl) {
    return null;
  }

  // Already connected
  if (redis?.isOpen) return redis;

  // Create client once
  if (!redis) {
    redis = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
        connectTimeout: 5000,
      },
    }) as RedisClientType;

    redis.on("error", (err) => console.error("Redis Client Error", err));
    redis.on("connect", () => console.log("✅ Redis connected"));
    redis.on("ready", () => console.log("✅ Redis ready"));
  }

  // Connect only once (handle concurrent callers)
  if (!connectPromise) {
    connectPromise = redis.connect().catch((err) => {
      console.error("Failed to connect to Redis:", err);
      redis = null;
      connectPromise = null;
    });
  }

  await connectPromise;
  return redis;
}
