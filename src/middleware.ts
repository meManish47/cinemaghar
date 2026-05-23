import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Match /admin routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  const url = new URL(req.url);
  const pathname = url.pathname;

  const res = NextResponse.next();
  res.headers.set("x-pathname", pathname);

  // 🔐 Protect admin routes
  if (isAdminRoute(req)) {
    // ❌ Not logged in
    if (!userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ✅ Read role directly from Clerk session
    const role = (sessionClaims?.publicMetadata as { role?: string })?.role;

    console.log("🔑 Middleware Role:", role);

    // ❌ Not admin
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
});

export const config = {
  matcher: [
    "/((?!_next|api/graphql|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};