import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";

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
    const userCookies = await cookies()
    userCookies.delete("token")
    return true
  } catch (error) {
    return false
  }
}
