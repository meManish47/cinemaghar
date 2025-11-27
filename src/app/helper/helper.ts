import { getCookies } from "@/services/jwt";

export async function getUserFromCookie() {
  const cookiesResult = await getCookies();
  if (
    cookiesResult &&
    typeof cookiesResult === "object" &&
    "clerkId" in cookiesResult &&
    "id" in cookiesResult &&
    "email" in cookiesResult
  ) {
    return cookiesResult as { clerkId: string; id: string; email: string };
  }
  return undefined;
}

