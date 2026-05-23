import { NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import { generateCookies } from "@/services/jwt";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { clerkId, email, name } = await req.json();

    if (!clerkId) {
      return new NextResponse("Missing Clerk ID", { status: 400 });
    }

    // ✅ Use transaction (safe upsert)
    const user = await prismaClient.user.upsert({
      where: { clerkId },
      update: {
        email,
        name,
      },
      create: {
        clerkId,
        email,
        name,
        role: "USER",
      },
    });

    const payload = {
      id: user.id,
      email: user.email,
      clerkId: user.clerkId,
      role: user.role,
    };

    // ✅ Get clerk inside handler
    const clerk = await clerkClient();

    // ✅ Merge metadata safely
    const existingUser = await clerk.users.getUser(clerkId);

    await clerk.users.updateUser(clerkId, {
      publicMetadata: {
        ...existingUser.publicMetadata,
        role: user.role,
        prismaUserId: user.id,
      },
      privateMetadata: {
        ...existingUser.privateMetadata,
        email: user.email,
        name: user.name,
      },
    });

    // ✅ Generate cookies AFTER everything succeeds
    await generateCookies(payload);

    return NextResponse.json({ success: true, user: payload });
  } catch (error) {
    console.error("Sync User Error:", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}