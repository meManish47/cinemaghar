// services/user.ts

import { User } from "../../generated/prisma";
import prismaClient from "./prisma";
import { getRedis } from "./redis";

export async function getUserByClerkIdCached(clerkId: string) {
  const redis = await getRedis();
  const key = `user:${clerkId}`;

  const cached = redis
    ? await redis.get<User>(key)
    : null;

  if (cached) {
    console.log("✅ USER CACHE HIT");
    return cached;
  }

  console.log("❌ USER CACHE MISS");

  const user = await prismaClient.user.findUnique({
    where: { clerkId },
  });

  if (user && redis) {
    await redis.set(key, JSON.stringify(user), {
      ex: 3000,
    });
  }

  return user;
}