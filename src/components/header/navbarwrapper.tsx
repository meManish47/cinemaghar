
import { auth, currentUser } from "@clerk/nextjs/server";
import { gqlClient } from "@/services/gql";
import { GET_USER_BY_CLERK_ID } from "@/app/queries";
import { User } from "../../../generated/prisma";
import NavBar from "./navbar";
import prismaClient from "@/services/prisma";
import { getUserByClerkIdCached } from "@/services/user";

export default async function NavBarWrapper() {
  // console.time("CURRENT USER")
  // const authUser = await currentUser();
  // console.timeEnd("CURRENT USER")
  // console.time("AUTH ID")
  const { userId } = await auth();
  // console.timeEnd("AUTH ID")
  
  if (!userId) return <NavBar />;

  try {
    // console.time("CURRENT USER DB")
    const user = await getUserByClerkIdCached(userId);
    // console.timeEnd("CURRENT USER DB")
    if (user?.role === "ADMIN") return null;
  } catch (err) {
    console.error("Navbar user fetch error:", err);
  }

  return <NavBar />;
}
