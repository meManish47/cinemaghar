"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutRedirectFunction({
  showId,
}: {
  showId: string;
}) {
  const router = useRouter();
  useEffect(() => {
    if (showId) {
      router.replace(`/movie/seatselection/${showId}`);
    }
  }, [showId, router]);

  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
