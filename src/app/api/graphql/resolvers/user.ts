import { getUserFromCookie } from "@/app/helper/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { User } from "../../../../../generated/prisma";
import { gqlClient } from "@/services/gql";
import { GET_USER_BY_CLERK_ID } from "@/app/queries";

export async function getUserByClerkId(
  parent: unknown,
  { clerkId }: { clerkId: string }
) {
  try {
    return await prismaClient.user.findUnique({ where: { clerkId } });
  } catch (error) {
    return null;
  }
}

export async function logoutUser() {
  try {
    const userCookies = await cookies();
    userCookies.delete("token");
    return true;
  } catch (error) {
    return false;
  }
}

export async function getCurrentUserEmail() {
  try {
    const userCookies = await getUserFromCookie();
    const clerkId = userCookies?.clerkId;

    if (!clerkId) {
      return "blank";
    }
    const currentUser: { getUserByClerkId: User } = await gqlClient.request(
      GET_USER_BY_CLERK_ID,
      { clerkId }
    );
    if (currentUser.getUserByClerkId.email !== "kmanish57610@gmail.com") {
      return "blank";
    }
    return currentUser.getUserByClerkId.email;
  } catch (error) {
    return (error as Error).message;
  }
}
