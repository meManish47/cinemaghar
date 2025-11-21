export async function GET() {
  console.log("cron activated ", new Date());
  return Response.json({ ok: true, time: Date.now() });
}
