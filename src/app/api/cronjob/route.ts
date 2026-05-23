import { softDeleteShows } from "@/services/cronservice";

export async function GET() {
  try {
    await softDeleteShows();
  } catch (err) {
    console.error("Cron error:", err);
  }
  return Response.json({ ok: true, time: Date.now() });
}
