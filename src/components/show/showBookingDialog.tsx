import { BookingWithSeats } from "@/app/types";
import { useState } from "react";


export function BookingsDialog({ bookings }: { bookings: BookingWithSeats[] }) {
  const [open, setOpen] = useState(false);
  //   console.log(bookings, "hello");
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-500 underline cursor-pointer ml-8"
      >
        View
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 relative">
            <h2 className="text-xl font-semibold mb-4">
              Show Bookings ({bookings.length})
            </h2>

            <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  No bookings for this show.
                </p>
              ) : (
                bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-gray-100 p-4 rounded-lg border text-sm space-y-2"
                  >
                    <p>
                      <b>Booking ID:</b> {b.id}
                    </p>

                    <p>
                      <b>User:</b>{" "}
                      {b.user?.name
                        ? `${b.user.name} (${b.user.email})`
                        : b.user?.email}
                    </p>

                    <p>
                      <b>Created on:</b>{" "}
                      {
                        new Date(Number(b.createdAt))
                          .toISOString()
                          .split("T")[0]
                      }
                    </p>

                    {/* Seats */}
                    <p className="text-gray-700">
                      <b>Seats:</b>{" "}
                      {b.seats?.map((s) => s.seat_no).join(", ") || "—"}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="mt-5 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
