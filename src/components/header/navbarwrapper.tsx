
import { currentUser } from "@clerk/nextjs/server";
import { gqlClient } from "@/services/gql";
import { GET_USER_BY_CLERK_ID } from "@/app/queries";
import { User } from "../../../generated/prisma";
import NavBar from "./navbar";

export default async function NavBarWrapper() {
  const authUser = await currentUser();
  if (!authUser) return <NavBar />;

  try {
    const data:{getUserByClerkId: User} = await gqlClient.request(GET_USER_BY_CLERK_ID, {
      clerkId: authUser.id,
    });
    const userDb = data?.getUserByClerkId;

    if (userDb?.role === "ADMIN") return null;
  } catch (err) {
    console.error("Navbar user fetch error:", err);
  }

  return <NavBar />;
}
