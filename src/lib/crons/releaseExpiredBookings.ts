import cron from "node-cron";
import prismaClient from "@/services/prisma";
import { releaseBooking } from "@/app/api/graphql/resolvers/booking";

export default function startReleaseExpiredBookingsCron() {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

      const expiredBookings = await prismaClient.booking.findMany({
        where: {
          status: "PENDING",
          createdAt: {
            lt: tenMinutesAgo,
          },
        },
        select: { id: true },
      });

      let releasedCount = 0;

      for (const booking of expiredBookings) {
        try {
          await releaseBooking(booking.id);
          releasedCount++;
        } catch (err) {
          console.error(`Failed to release booking ${booking.id}:`, err);
        }
      }

      if (releasedCount > 0) {
        console.log(
          `[releaseExpiredBookings] Released ${releasedCount} expired booking(s)`
        );
      }
    } catch (err) {
      console.error("[releaseExpiredBookings] Error running cron job:", err);
    }
  });
}
