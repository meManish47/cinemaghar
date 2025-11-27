import { NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import { generateCookies } from "@/services/jwt";

export async function POST(req: Request) {
  const { clerkId, email, name } = await req.json();

  if (!clerkId) {
    return new NextResponse("Missing Clerk ID", { status: 400 });
  }
  const existingUser = await prismaClient.user.findUnique({
    where: { clerkId },
  });
  let user;
  if (existingUser) {
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
  };

  await generateCookies(payload);

  return NextResponse.json({ success: true });
}
