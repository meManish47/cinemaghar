import AdminDashboard from "@/app/admin/page";
import { GET_USER_BY_CLERK_ID } from "@/app/queries";
import { gqlClient } from "@/services/gql";
import { currentUser } from "@clerk/nextjs/server";
import AdminNavBar from "../admin/adminNavBar";
import HomePage from "../homepage/homepage";
import { User } from "../../../generated/prisma";
import { getRedis } from "@/services/redis";

export default async function HomeLogic() {
  const authUser = await currentUser();

  // 🟢 Not logged in → skip everything
  if (!authUser) return <HomePage />;

  const USER_CACHE_KEY = `user:${authUser.id}`;

  let userDb: User | null = null;

  try {
    const redis = await getRedis();

    // 🟢 1. Try cache
    if (redis) {
      const cached = await redis.get(USER_CACHE_KEY);

      if (cached) {
        userDb = JSON.parse(cached);
        console.log("✅ USER CACHE HIT");
      }
    }

    if (!userDb) {
      console.log("❌ USER CACHE MISS");

      // 🔴 2. Fetch from GraphQL
      const data: { getUserByClerkId: User } =
        await gqlClient.request(GET_USER_BY_CLERK_ID, {
          clerkId: authUser.id,
        });

      userDb = data?.getUserByClerkId ?? null;

      // 💾 3. Store in Redis
      if (userDb && redis) {
        await redis.set(USER_CACHE_KEY, JSON.stringify(userDb), {
          EX: 3, // cache for 5 minutes
        });
      }
    }
  } catch (err) {
    console.error("GraphQL/Redis Error:", err);
    return <HomePage />;
  }

  // 🟡 4. Fallback (no crash)
  if (!userDb) return <HomePage />;

  // 🟢 5. Role check
  if (userDb.role !== "ADMIN") return <HomePage />;

  // 🔥 Admin view
  return (
    <div className="flex flex-col">
      <AdminNavBar />
      <div className="flex">
        <main className="flex-1 p-6 sm:px-32">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
}