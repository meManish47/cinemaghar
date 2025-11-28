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

export default async function HeaderComponent() {
  const authUser = await currentUser();

  if (!authUser) {
    return (
      <header>
        <div className="w-full h-16 flex items-center px-2 sm:px-32 justify-between">
          {/* Logo */}
          <div className="h-full w-full flex items-center gap-4 justify-between sm:justify-start">
            <Link href="/">
              <Image src="/showLogo.png" alt="Logo" height={150} width={150} />
            </Link>
          </div>
          <SignIn />
        </div>
      </header>
    );
  }

  let userDb = null;
  try {
    const data: { getUserByClerkId: User } = await gqlClient.request(
      GET_USER_BY_CLERK_ID,
      {
        clerkId: authUser.id,
      }
    );
    userDb = data?.getUserByClerkId ?? null;
  } catch (err) {
    console.error("GraphQL fetch error:", err);
  }

  const isAdmin = userDb?.role === "ADMIN";

  return (
    <header>
      <div className="w-full h-16 flex items-center px-2 sm:px-32 justify-between">
        <div className="h-full w-full flex items-center gap-4 justify-between sm:justify-start">
          <Link href="/">
            <Image src="/showLogo.png" alt="Logo" height={150} width={150} />
          </Link>

          {!isAdmin && (
            <div className="flex items-center gap-4">
              <div className="h-4 sm:h-full w-max flex items-center">
                <SearchBar />
              </div>
            </div>
          )}
        </div>
        {!isAdmin && <LocationSelector />}
        <SignIn />
        <UserSidebar userDb={userDb}/>
      </div>
    </header>
  );
}
