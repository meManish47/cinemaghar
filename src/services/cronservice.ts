import prismaClient from "./prisma";


export async function softDeleteShows() {
  try {
    // 6 hours ago
    const cutoffTime = new Date(
      Date.now() - 6 * 60 * 60 * 1000
    );

    const result = await prismaClient.show.updateMany({
      where: {
        start: {
          lte: cutoffTime,
        },
      },
      data: {
        isDeleted: true,
      },
    });

    console.log(`Soft deleted ${result.count} shows`);
  } catch (error) {
    console.error("Error:", error);
  }
}