import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function generateCookies(payload: {
  clerkId: string;
  id: string;
  email: string;
}) {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  const userCookies = await cookies();
  userCookies.set("token", token);
}

export async function getCookies() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.decode(token);

    return decoded;
  } catch (err) {
    // console.error("Invalid or expired token", err);
    return null;
  }
}
