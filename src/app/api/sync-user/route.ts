import { NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import { generateCookies } from "@/services/jwt";

export async function POST(req: Request) {
  const { clerkId, email, name } = await req.json();

  if (!clerkId) {
    return new NextResponse("Missing Clerk ID", { status: 400 });
  }

  const user = await prismaClient.user.upsert({
    where: { clerkId },
    update: { email, name },
    create: { clerkId, email, name },
  });
  if (user) {
    const payload: { clerkId: string; id: string; email: string } = {
      id: user.id,
      email: user.email,
      clerkId,
    };
    await generateCookies(payload);
  }
  return NextResponse.json({ success: true });
}
