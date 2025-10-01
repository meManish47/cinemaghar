import prismaClient from "@/services/prisma";

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
