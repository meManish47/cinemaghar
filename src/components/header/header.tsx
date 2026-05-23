import Image from "next/image";
import Link from "next/link";
import SignIn from "./clerkSignIn";
import SearchBar from "./searchbar";
import { currentUser } from "@clerk/nextjs/server";
import UserSidebar from "../homepage/userSidebar";
import { gqlClient } from "@/services/gql";
import { GET_USER_BY_CLERK_ID } from "@/app/queries";
import { User } from "../../../generated/prisma";
import LocationSelector from "../layout/locationselector";
import redis from "@/services/redis";

export default async function HeaderComponent() {
  const authUser = await currentUser();

  if (!authUser) {
    return (
      <header>
        <div className="w-full h-16 flex items-center px-2 sm:px-32 justify-between">
          <div className="h-full w-full flex items-center gap-4 justify-between sm:justify-start">
            <Link href="/">
              <Image src="/cinemaghar.png" alt="Logo" height={150} width={150} />
            </Link>
          </div>
          <SignIn />
        </div>
      </header>
    );
  }

  const USER_CACHE_KEY = `user:${authUser.id}`;

  let userDb: User | null = null;

  try {
    // ✅ 1. Try Redis
    const cached = await redis.get(USER_CACHE_KEY);

    if (cached) {
      console.log("✅ HEADER CACHE HIT");
      userDb = JSON.parse(cached);
    } else {
      console.log("❌ HEADER CACHE MISS");

      // 🔴 2. Fetch from GraphQL
      const data: { getUserByClerkId: User } =
        await gqlClient.request(GET_USER_BY_CLERK_ID, {
          clerkId: authUser.id,
        });

      userDb = data?.getUserByClerkId ?? null;

      // 💾 3. Store in Redis
      if (userDb) {
        await redis.set(USER_CACHE_KEY, JSON.stringify(userDb), {
          EX: 3000,
        });
      }
    }
  } catch (err) {
    console.error("Header user fetch error:", err);
  }

  const isAdmin = userDb?.role === "ADMIN";

  return (
    <header>
      <div className="w-full h-16 flex items-center px-2 sm:px-32 justify-between">
        <div className="h-full w-full flex items-center gap-4 justify-between sm:justify-start">
          <Link href="/">
            <Image
              src="/cinemaghar.png"
              className={`w-32 sm:w-max ${
                isAdmin ? "sm:px-10 px-4" : "ps-2"
              }`}
              alt="Logo"
              height={150}
              width={150}
            />
          </Link>

          {!isAdmin && (
            <div className="flex items-center gap-4 w-full">
              <div className="h-4 sm:h-full w-max flex items-center">
                <SearchBar />
              </div>
            </div>
          )}
        </div>

        {!isAdmin && <LocationSelector />}
        <SignIn />
        <UserSidebar userDb={userDb} />
      </div>
    </header>
  );
}