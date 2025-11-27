import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { User } from "../generated/prisma";
import { getUserFromCookie } from "./app/helper/helper";
import { GET_USER_BY_CLERK_ID } from "./app/queries";
import { gqlClient } from "./services/gql";

// Match /admin routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  // If route is /admin, check user
  if (isAdminRoute(req)) {
    const userCookies = await getUserFromCookie();
    const clerkId = userCookies?.clerkId;

    if (!clerkId) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const currentUser: { getUserByClerkId: User } = await gqlClient.request(
      GET_USER_BY_CLERK_ID,
      { clerkId }
    );
    if (!currentUser.getUserByClerkId) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (currentUser.getUserByClerkId.role !== "ADMIN") {
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
