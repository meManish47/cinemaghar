import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const redis = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 100, 1000),
  },
});

redis.on("error", (err) => console.log("Redis Client Error", err));
redis.on("connect", () => console.log("Redis connected"));
redis.on("ready", () => console.log("Redis ready"));

try {
  if (!redis.isOpen) await redis.connect();
} catch (err) {
  console.error("Failed to connect to Redis:", err);
}

export default redis;
