import Image from "next/image";
import Link from "next/link";
import SignIn from "./clerkSignIn";
import SearchBar from "./searchbar";
import { auth } from "@clerk/nextjs/server";
import UserSidebar from "../homepage/userSidebar";
import LocationSelector from "../layout/locationselector";
import { getUserByClerkIdCached } from "@/services/user";

export default async function HeaderComponent() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <header>
        <div className="w-full h-16 flex items-center px-2 sm:px-32 justify-between">
          <div className="h-full w-full flex items-center gap-4 justify-between sm:justify-start">
            <Link href="/">
              <Image
                src="/cinemaghar.png"
                alt="Logo"
                height={150}
                width={150}
              />
            </Link>
          </div>

          <SignIn />
        </div>
      </header>
    );
  }

  let userDb = null;

  try {
    userDb = await getUserByClerkIdCached(userId);
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