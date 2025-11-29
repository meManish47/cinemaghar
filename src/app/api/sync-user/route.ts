import { NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import { generateCookies } from "@/services/jwt";
import { clerkClient } from "@clerk/nextjs/server";

const clerk = await clerkClient();

export async function POST(req: Request) {
  const { clerkId, email, name } = await req.json();

  if (!clerkId) {
    return new NextResponse("Missing Clerk ID", { status: 400 });
  }

  let user = await prismaClient.user.findUnique({
    where: { clerkId },
  });

  if (user) {
    user = await prismaClient.user.update({
      where: { clerkId },
      data: { email, name },
    });
  } else {
    user = await prismaClient.user.create({
      data: { clerkId, email, name, role: "USER" },
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
    clerkId: user.clerkId,
    role: user.role,
  };

  // Update Clerk user metadata
  await clerk.users.updateUser(clerkId, {
    publicMetadata: {
      role: user.role,
      prismaUserId: user.id,
    },
    privateMetadata: {
      email: user.email,
      name: user.name,
    },
  });

  await generateCookies(payload);

  return NextResponse.json({ success: true, user: payload });
}
