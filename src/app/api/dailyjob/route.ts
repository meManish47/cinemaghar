export async function GET() {
  alert("cron activated ");
  return Response.json({ ok: true, time: Date.now() });
}
