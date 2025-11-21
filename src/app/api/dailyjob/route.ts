export async function GET() {
  console.log("Cron ran:", new Date());

  // Your logic here:
  // await cleanup()
  // await updateData()
  // await sendMail()

  return Response.json({ ok: true, time: Date.now() });
}
