import prismaClient from "@/services/prisma";

export async function getAllHalls() {
  try {
    const halls = await prismaClient.hall.findMany({
      include: {
        cinema: true,
        shows: {
          include: { movie: true, bookings: { include: { seats: true ,user:true} } },
        },
      },
    });
    if (halls) return halls;
    return null;
  } catch (error) {
    return null;
  }
}
export async function addHall(
  parent: unknown,
  args: {
    hall_name: string;
    cinemaId: string;
    capacity: number;
    rows: number;
    columns: number;
  }
) {
  try {
    const hall = await prismaClient.hall.create({
      data: {
        hall_name: args.hall_name,
        cinemaId: args.cinemaId,
        capacity: args.capacity,
        rows: args.rows,
        columns: args.columns,
      },
    });
    if (hall) {
      for (let i = 0; i < hall.rows; i++) {
        for (let j = 0; j < hall.columns; j++) {
          const seat_no = `${String.fromCharCode(65 + i)}${j + 1}`;
          await prismaClient.seat.create({
            data: {
              hallId: hall.id,
              row_no: i + 1,
              col_no: j + 1,
              seat_no,
            },
          });
        }
      }
      return hall;
    }
  } catch (error) {
    return null;
  }
}

