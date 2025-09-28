import { NextResponse } from "next/server";
import prismaClient from "@/services/prisma";

export async function POST(req: Request) {
  const { clerkId, email, name } = await req.json();

  if (!clerkId) {
    return new NextResponse("Missing Clerk ID", { status: 400 });
  }

  await prismaClient.user.upsert({
    where: { clerkId },
    update: { email, name },
    create: { clerkId, email, name },
  });

  return NextResponse.json({ success: true });
}
