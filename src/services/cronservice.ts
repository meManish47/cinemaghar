import prismaClient from "./prisma";

export async function softDeleteShows() {
  try {
    const cutoffTime = Date.now() - 6 * 60 * 60 * 1000;

    const result = await prismaClient.show.updateMany({
      where: {
        start: {
          lte: cutoffTime.toString(),
        },
      },
      data: {
        isDeleted: true,
      },
    });

    console.log(`✅ Deleted ${result.count} shows`);
  } catch (err) {
    console.error("Error:", err);
  }
}
