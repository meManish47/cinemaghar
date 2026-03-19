import { createClient } from "redis";

const redis = createClient();

redis.on("error", (err) => console.log("Redis Client Error", err));

try {
  await redis.connect();
} catch (err) {
  console.error("Failed to connect to Redis:", err);
}

export default redis;
