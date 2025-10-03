import { useUser } from "@clerk/nextjs";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { gqlClient } from "./services/gql";
import { GET_USER_BY_CLERK_ID } from "./app/queries";
import { User } from "../generated/prisma";
import { getCookies } from "./services/jwt";
import { JwtPayload } from "jsonwebtoken";

// Match /admin routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // If route is /admin, check user
  if (isAdminRoute(req)) {
    const cookiesResult = await getCookies();
    let userCookies: { clerkId: string; id: string; email: string } | undefined;
    if (
      cookiesResult &&
      typeof cookiesResult === "object" &&
      "clerkId" in cookiesResult &&
      "id" in cookiesResult &&
      "email" in cookiesResult
    ) {
      userCookies = cookiesResult as {
        clerkId: string;
        id: string;
        email: string;
      };
    } else {
      userCookies = undefined;
    }
    const clerkId = userCookies?.clerkId;

    if (!clerkId) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const currentUser: { getUserByClerkId: User } = await gqlClient.request(
      GET_USER_BY_CLERK_ID,
      { clerkId }
    );
    if (currentUser.getUserByClerkId.email !== "kmanish57610@gmail.com") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
